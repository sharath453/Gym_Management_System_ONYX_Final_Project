from rest_framework import viewsets, permissions
from .models import Trainer, Workout, Attendance, Diet, BMI
from .serializers import TrainerSerializer, WorkoutSerializer, AttendanceSerializer, DietSerializer, BMISerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

# Custom Permission: Only trainers can access their members
class IsTrainerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_staff:  # Admin can access everything
            return True
        if hasattr(user, 'trainer'):
            if hasattr(obj, 'trainer'):
                return obj.trainer == user.trainer
            elif hasattr(obj, 'member'):
                return obj.member.trainer == user.trainer
        return False

# Trainer ViewSet
class TrainerViewSet(viewsets.ModelViewSet):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

# Workout ViewSet
class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsTrainerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'trainer'):
            return Workout.objects.filter(trainer=user.trainer)
        return Workout.objects.none()

# Attendance ViewSet
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsTrainerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'trainer'):
            return Attendance.objects.filter(trainer=user.trainer)
        return Attendance.objects.none()

# Diet ViewSet
class DietViewSet(viewsets.ModelViewSet):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsTrainerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'trainer'):
            return Diet.objects.filter(trainer=user.trainer)
        return Diet.objects.none()

# BMI ViewSet
class BMIViewSet(viewsets.ModelViewSet):
    queryset = BMI.objects.all()
    serializer_class = BMISerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsTrainerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'trainer'):
            return BMI.objects.filter(trainer=user.trainer)
        return BMI.objects.none()
