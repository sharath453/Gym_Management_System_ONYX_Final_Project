from rest_framework import viewsets
from .models import Trainer, Workout, Attendance, Diet, BMI
from .serializers import (
    TrainerSerializer,
    WorkoutSerializer,
    AttendanceSerializer,
    DietSerializer,
    BMISerializer,
    MemberForTrainerSerializer
)
from member.models import Member

# -----------------------------
# Trainer CRUD
# -----------------------------
class TrainerViewSet(viewsets.ModelViewSet):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer

# -----------------------------
# Workout CRUD
# -----------------------------
class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

# -----------------------------
# Diet CRUD
# -----------------------------
class DietViewSet(viewsets.ModelViewSet):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer

# -----------------------------
# BMI CRUD
# -----------------------------
class BMIViewSet(viewsets.ModelViewSet):
    queryset = BMI.objects.all()
    serializer_class = BMISerializer

# -----------------------------
# Attendance CRUD
# -----------------------------
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

# -----------------------------
# Member list for trainers (read-only)
# -----------------------------
class MemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberForTrainerSerializer
