# accounts/models.py
from django.db import models
from django.contrib.auth.hashers import make_password

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=128)  # hashed password
    role = models.CharField(max_length=20)       # Admin / Trainer / Member

    def save(self, *args, **kwargs):
        # Hash password if not already hashed
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.role})"
    