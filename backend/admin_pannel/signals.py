# admin_app/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from admin_pannel.models import Admin
from Account.models import User

@receiver(post_save, sender=Admin)
def create_user_from_admin(sender, instance, created, **kwargs):
    if created:
        User.objects.create(
            username=instance.username,
            password=instance.password,  # will be hashed in User.save()
            role='Admin'
        )
