from django.contrib import admin
from .models import Trainer, Workout, Diet, BMI, Attendance

@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    list_display = ['username', 'name', 'email', 'join_date']

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['member', 'trainer', 'created_at']

@admin.register(Diet)
class DietAdmin(admin.ModelAdmin):
    list_display = ['member', 'trainer', 'diet_time']

@admin.register(BMI)
class BMIAdmin(admin.ModelAdmin):
    list_display = ['member', 'trainer', 'bmi_value', 'created_at']

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ['member', 'trainer', 'date', 'status']