# admin_pannel/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import admin_home, MemberViewSet, TrainerViewSet, AttendanceViewSet, PlanViewSet

router = DefaultRouter()
router.register(r'members', MemberViewSet, basename='member')
router.register(r'trainers', TrainerViewSet, basename='trainer')
router.register(r'attendance', AttendanceViewSet, basename='attendance')
router.register(r'plans', PlanViewSet, basename='plan')

urlpatterns = [
    path('', admin_home, name='admin-home'),
    path('api/admin/', include(router.urls)),
]
