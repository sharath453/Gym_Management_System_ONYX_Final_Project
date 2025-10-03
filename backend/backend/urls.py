from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),                
    path('', include('admin_pannel.urls')),          
    path('member/', include('member.urls')),       
    path('trainer/', include('trainer.urls')),     
]
