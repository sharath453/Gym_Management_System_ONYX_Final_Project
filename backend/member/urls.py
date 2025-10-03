from django.urls import path
from . import views

urlpatterns = [
    path('', views.member_home, name='member_home'),
    # Add more member URLs here
]
