# members/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from member.models import Member
from Account.models import User

@receiver(post_save, sender=Member)
def create_user_from_member(sender, instance, created, **kwargs):
    if created:
        User.objects.create(
            username=instance.username,
            password=instance.password,
            role='Member'
        )
