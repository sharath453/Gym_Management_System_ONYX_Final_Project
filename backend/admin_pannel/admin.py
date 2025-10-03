from django.contrib import admin
from .models import Admin, Plan

@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
    list_display = ('username', 'name', 'email')

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration_days', 'price')
