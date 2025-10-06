from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Member, BMIHistory
from trainer.models import Workout, Attendance, Diet, BMI
from .serializers import (
    MemberDashboardSerializer,
    MemberProfileSerializer,
    WorkoutSerializer,
    DietSerializer,
    AttendanceSerializer,
    BMIHistorySerializer,
    BMISerializer,
)


class MemberDashboardView(APIView):
    """GET /member/<username>/dashboard/"""
    def get(self, request, username):
        member = get_object_or_404(Member, username=username)
        serializer = MemberDashboardSerializer(member)
        return Response(serializer.data)


class MemberProfileView(generics.RetrieveAPIView):
    """GET /member/<username>/profile/"""
    queryset = Member.objects.all()
    serializer_class = MemberProfileSerializer
    lookup_field = "username"


class MemberWorkoutListView(generics.ListAPIView):
    """GET /member/<username>/workouts/"""
    serializer_class = WorkoutSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        return Workout.objects.filter(member__username=username).order_by("-created_at")


class MemberDietListView(generics.ListAPIView):
    """GET /member/<username>/diet/"""
    serializer_class = DietSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        return Diet.objects.filter(member__username=username).order_by("-created_at")


class MemberAttendanceView(generics.ListAPIView):
    """GET /member/<username>/attendance/"""
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        return Attendance.objects.filter(member__username=username).order_by("-date")


class MemberBMIView(APIView):
    """GET /member/<username>/bmi/"""
    def get(self, request, username):
        member = get_object_or_404(Member, username=username)
        history = BMIHistory.objects.filter(member=member).order_by("date")
        current = member.bmis.order_by("-created_at").first()
        data = {
            "current": BMISerializer(current).data if current else None,
            "history": BMIHistorySerializer(history, many=True).data,
        }
        return Response(data)
    

from rest_framework import viewsets, permissions
from .models import Member
from .serializers import MemberSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [permissions.AllowAny]