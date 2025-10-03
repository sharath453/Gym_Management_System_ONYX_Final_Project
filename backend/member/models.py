from django.db import models
from admin_pannel.models import Plan

class Member(models.Model):
    username = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    gender_choices = (("M", "Male"), ("F", "Female"), ("O", "Other"))
    gender = models.CharField(max_length=1, choices=gender_choices)
    join_date = models.DateField(auto_now_add=True)
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.username
