from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Admin, Plan
from .serializers import AdminSerializer, PlanSerializer, MemberSerializer, TrainerSerializer, AttendanceSerializer
from member.models import Member
from trainer.models import Attendance
from trainer.models import Trainer
from django.contrib.auth.hashers import make_password

# ----------------- Admin Home -----------------
def admin_home(request):
    return HttpResponse("Hi, this is the Admin Home Page")


# ----------------- Member ViewSet -----------------
class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    @action(detail=True, methods=['patch'])
    def reset_password(self, request, pk=None):
        member = self.get_object()
        new_password = request.data.get("password")
        if new_password:
            member.password = make_password(new_password)
            member.save()
            return Response({"status": "Password updated successfully"})
        return Response({"error": "Password not provided"}, status=status.HTTP_400_BAD_REQUEST)


# ----------------- Trainer ViewSet -----------------
class TrainerViewSet(viewsets.ModelViewSet):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer

    @action(detail=True, methods=['patch'])
    def reset_password(self, request, pk=None):
        trainer = self.get_object()
        new_password = request.data.get("password")
        if new_password:
            trainer.password = make_password(new_password)
            trainer.save()
            return Response({"status": "Password updated successfully"})
        return Response({"error": "Password not provided"}, status=status.HTTP_400_BAD_REQUEST)


# ----------------- Attendance ViewSet -----------------
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    # Optional filtering by member or month
    def get_queryset(self):
        queryset = super().get_queryset()
        member_id = self.request.query_params.get('member')
        month = self.request.query_params.get('month')
        if member_id:
            queryset = queryset.filter(member_id=member_id)
        if month:
            queryset = queryset.filter(date__month=month)
        return queryset


# ----------------- Plan ViewSet -----------------
class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

    @action(detail=True, methods=['post'])
    def assign_member(self, request, pk=None):
        plan = self.get_object()
        member_id = request.data.get("member_id")
        if member_id:
            try:
                member = Member.objects.get(id=member_id)
                member.plan = plan
                member.save()
                return Response({"status": f"Plan assigned to member {member.name}"})
            except Member.DoesNotExist:
                return Response({"error": "Member not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"error": "Member ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
