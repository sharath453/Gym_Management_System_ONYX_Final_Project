from django.contrib import admin
from .models import Member

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('username', 'name', 'email', 'gender', 'join_date', 'plan', 'trainer', 'height', 'weight', 'created_at', 'updated_at')