from rest_framework.routers import DefaultRouter
from .views import (
    TrainerViewSet,
    WorkoutViewSet,
    DietViewSet,
    BMIViewSet,
    AttendanceViewSet
    # Remove MemberViewSet from here
)

router = DefaultRouter()
router.register(r'trainers', TrainerViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'diets', DietViewSet)
router.register(r'bmis', BMIViewSet)
router.register(r'attendances', AttendanceViewSet)
# Remove members registration from here

urlpatterns = router.urls