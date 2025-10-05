from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'role']  # you can remove password from list_display for security

admin.site.register(User, UserAdmin)
