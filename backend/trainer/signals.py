# trainers/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from trainer.models import Trainer
from Account.models import User

@receiver(post_save, sender=Trainer)
def create_user_from_trainer(sender, instance, created, **kwargs):
    if created:
        User.objects.create(
            username=instance.username,
            password=instance.password,
            role='Trainer'
        )
