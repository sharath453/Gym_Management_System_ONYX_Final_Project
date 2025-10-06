from rest_framework import viewsets, permissions
from .models import Trainer, Workout, Diet, BMI, Attendance
from .serializers import (
    TrainerSerializer, WorkoutSerializer, 
    DietSerializer, BMISerializer, AttendanceSerializer
)
# Remove the Member import from here

class TrainerViewSet(viewsets.ModelViewSet):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer
    permission_classes = [permissions.AllowAny]

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.AllowAny]

class DietViewSet(viewsets.ModelViewSet):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer
    permission_classes = [permissions.AllowAny]

class BMIViewSet(viewsets.ModelViewSet):
    queryset = BMI.objects.all()
    serializer_class = BMISerializer
    permission_classes = [permissions.AllowAny]

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.AllowAny]

# Remove MemberViewSet from trainer/views.py
# We'll create it in member/views.py instead