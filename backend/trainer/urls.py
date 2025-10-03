from rest_framework.routers import DefaultRouter
from .views import (
    TrainerViewSet,
    WorkoutViewSet,
    DietViewSet,
    BMIViewSet,
    AttendanceViewSet,
    MemberViewSet
)

router = DefaultRouter()
router.register(r'trainers', TrainerViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'diets', DietViewSet)
router.register(r'bmis', BMIViewSet)
router.register(r'attendances', AttendanceViewSet)
router.register(r'members', MemberViewSet, basename='member')

urlpatterns = router.urls
