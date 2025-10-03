# accounts/urls.py
from django.urls import path
from .views import CustomTokenObtainView

urlpatterns = [
    path('login/', CustomTokenObtainView.as_view(), name='custom_token_obtain'),
]
