from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Trainer, Workout, Diet, BMI, Attendance
from .serializers import TrainerSerializer, WorkoutSerializer, DietSerializer, BMISerializer, AttendanceSerializer

# Trainer ViewSet (existing)
class TrainerViewSet(viewsets.ModelViewSet):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer
    permission_classes = [permissions.AllowAny]

# Other ViewSets...
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

# -------------------------------
# LOGIN API WITH JWT
# -------------------------------
@api_view(['POST'])
def trainer_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"detail": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        trainer = Trainer.objects.get(username=username)
    except Trainer.DoesNotExist:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    # Check password (we’ll store hashed passwords)
    if not check_password(password, trainer.password):
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    # Generate JWT tokens
    refresh = RefreshToken.for_user(trainer)
    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    })
