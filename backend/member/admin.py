from django.contrib import admin
from .models import Member, BMIHistory

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('username', 'name', 'email', 'gender', 'join_date', 'plan', 'trainer', 'height', 'weight')
    search_fields = ('username', 'name', 'email')
    list_filter = ('gender', 'plan', 'trainer')


@admin.register(BMIHistory)
class BMIHistoryAdmin(admin.ModelAdmin):
    list_display = ('member', 'bmi', 'weight', 'height', 'date')
    list_filter = ('date', 'member')
