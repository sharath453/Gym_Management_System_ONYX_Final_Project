# accounts/views.py
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password, check_password
from django.db.models import Sum
from .serializers import LoginSerializer ,PlanSerializer, AdminSerializer
from rest_framework import status , viewsets
from member.models import Member
from trainer.models import Trainer
from admin_pannel.models import Plan 
from admin_pannel.models import Admin   
from .models import User
import jwt
from django.conf import settings





class RoleLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)  # <-- see the exact validation error
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # create JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': user.role,
            'username': user.username
        }, status=status.HTTP_200_OK)
    

class AdminDashboardView(APIView):
    def get(self, request):
        total_members = Member.objects.count()
        active_trainers = Trainer.objects.count()
        total_plans = Plan.objects.count()

        # Total revenue = sum of all member's plan prices
        total_revenue = (
            Member.objects.aggregate(total=Sum("plan__price"))["total"] or 0
        )

        data = {
            "total_members": total_members,
            "active_trainers": active_trainers,
            "total_plans": total_plans,
            "total_revenue": total_revenue,
        }

        return Response(data)


class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class AdminProfileView(APIView):

    def get(self, request):
        username = request.query_params.get("username")
        if not username:
            return Response({"error": "Username required"}, status=400)
        try:
            admin = Admin.objects.get(username=username)
            data = {
                "username": admin.username,
                "name": admin.name,
                "email": admin.email,
                "phone_number": admin.phone_number,
            }
            return Response(data)
        except Admin.DoesNotExist:
            return Response({"error": "Admin not found"}, status=404)
        

class ChangePasswordView(APIView):
    def post(self, request):
        username = request.data.get("username")  # Or get from token / localStorage
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        try:
            admin = Admin.objects.get(username=username)
        except Admin.DoesNotExist:
            return Response({"error": "Admin not found"}, status=status.HTTP_404_NOT_FOUND)

        # Temporary plain-text check (NOT SECURE)
        if old_password != admin.password:
            print(old_password)
            print(admin.password)
            return Response({"error": "Old password is incorrect"}, status=400)

        # Update password
        admin.password = new_password  # No hashing
        admin.save(update_fields=["password"])

        return Response({"message": "Password changed successfully"})