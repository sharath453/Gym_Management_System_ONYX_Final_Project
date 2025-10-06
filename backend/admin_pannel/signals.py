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
    else:
        # Update existing User entry if it exists
        try:
            user = User.objects.get(username=instance.username, role='Admin')
            user.password = instance.password  # Will rehash in User.save()
            user.save()
        except User.DoesNotExist:
            # In case the user was deleted manually, recreate it
            User.objects.create(
                username=instance.username,
                password=instance.password,
                role='Admin'
            )
