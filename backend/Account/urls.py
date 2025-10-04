# accounts/urls.py
from django.urls import path
from .views import RoleLoginView

urlpatterns = [
    path('login/', RoleLoginView.as_view(), name='Login'),
]
