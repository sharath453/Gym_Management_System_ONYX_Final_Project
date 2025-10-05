from django.db import models
from django.contrib.auth.hashers import make_password, is_password_usable

class Admin(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def save(self, *args, **kwargs):
        print("Before hashing:", self.password)
        if not is_password_usable(self.password):
            self.password = make_password(self.password)
        print("After hashing:", self.password)
        super().save(*args, **kwargs)


    def __str__(self):
        return self.username



class Plan(models.Model):
    name = models.CharField(max_length=50)
    duration_days = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
