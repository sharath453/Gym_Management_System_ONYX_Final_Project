from django.urls import path
from . import views

urlpatterns = [
    path('', views.trainer_home, name='trainer_home'),
    # Add more trainer URLs here
]
