from django.urls import path
from . import views

urlpatterns = [
    path("<str:username>/dashboard/", views.MemberDashboardView.as_view(), name="member-dashboard"),
    path("<str:username>/profile/", views.MemberProfileView.as_view(), name="member-profile"),
    path("<str:username>/workouts/", views.MemberWorkoutListView.as_view(), name="member-workouts"),
    path("<str:username>/diet/", views.MemberDietListView.as_view(), name="member-diet"),
    path("<str:username>/attendance/", views.MemberAttendanceView.as_view(), name="member-attendance"),
    path("<str:username>/bmi/", views.MemberBMIView.as_view(), name="member-bmi"),
]
