from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrainerViewSet, WorkoutViewSet, AttendanceViewSet, DietViewSet, BMIViewSet

router = DefaultRouter()
router.register(r'trainers', TrainerViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'diets', DietViewSet)
router.register(r'bmis', BMIViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
