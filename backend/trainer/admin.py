from django.contrib import admin
from .models import Trainer, Workout, Attendance, Diet

@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    list_display = ('username', 'name', 'email', 'phone_number', 'join_date')

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('trainer', 'member', 'created_at')

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('member', 'date', 'status')

@admin.register(Diet)
class DietAdmin(admin.ModelAdmin):
    list_display = ('trainer', 'member', 'diet_time')
