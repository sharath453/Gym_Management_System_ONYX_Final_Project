from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),                
    path('', include('admin_pannel.urls')),          
    path('member/', include('member.urls')),     # Add this line  
    path('trainer/', include('trainer.urls')),     
    path('api/', include('trainer.urls')),
    path('api/', include('member.urls')),  # Add this line
]