from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls), 
    path('api/', include('Account.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),# Login → JWT
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),# Refresh token             
    path('', include('admin_pannel.urls')),          
    path('api/', include('member.urls')),
    path('member/', include('member.urls')),   # Add this line  
    path('api/', include('trainer.urls')), 
]