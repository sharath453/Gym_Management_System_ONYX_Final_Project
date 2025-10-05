from rest_framework.routers import DefaultRouter
from .views import TrainerViewSet, WorkoutViewSet, DietViewSet, BMIViewSet, AttendanceViewSet, trainer_login
from django.urls import path

router = DefaultRouter()
router.register(r'trainers', TrainerViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'diets', DietViewSet)
router.register(r'bmis', BMIViewSet)
router.register(r'attendances', AttendanceViewSet)

urlpatterns = router.urls + [
    path('trainer-login/', trainer_login, name='trainer-login'),
]
