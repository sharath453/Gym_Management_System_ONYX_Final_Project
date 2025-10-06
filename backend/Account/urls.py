# accounts/urls.py
from django.urls import path , include
from rest_framework.routers import DefaultRouter
from .views import RoleLoginView , AdminDashboardView ,PlanViewSet , AdminProfileView, ChangePasswordView

router = DefaultRouter()
router.register(r'admin/plan', PlanViewSet, basename='plan')

urlpatterns = [
    path('login/', RoleLoginView.as_view(), name='Login'),
    path('admin/dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('', include(router.urls)),
    path("admin/profile/", AdminProfileView.as_view(), name="admin-profile"),
    path("admin/change-password/", ChangePasswordView.as_view(), name="change-password"),
]
