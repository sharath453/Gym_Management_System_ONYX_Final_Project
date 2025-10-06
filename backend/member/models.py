# from django.db import models
# from admin_pannel.models import Plan

# class Member(models.Model):
#     username = models.CharField(max_length=50, unique=True)
#     name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)
#     gender_choices = (("M", "Male"), ("F", "Female"), ("O", "Other"))
#     gender = models.CharField(max_length=1, choices=gender_choices)
#     join_date = models.DateField(auto_now_add=True)
#     plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True)

#     def __str__(self):
#         return self.username



from django.db import models
from admin_pannel.models import Plan
# from trainer.models import Trainer


class Member(models.Model):
    GENDER_CHOICES = (("M", "Male"), ("F", "Female"), ("O", "Other"))

    username = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    join_date = models.DateField(auto_now_add=True)
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True)
    trainer = models.ForeignKey(
        'trainer.Trainer', on_delete=models.SET_NULL, null=True, blank=True, related_name='members'
    )
    height = models.FloatField(null=True, blank=True)  # in cm
    weight = models.FloatField(null=True, blank=True)  # in kg
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    trainer = models.ForeignKey('trainer.Trainer', on_delete=models.SET_NULL, null=True, blank=True)
    height = models.FloatField(null=True, blank=True)  # in cm
    weight = models.FloatField(null=True, blank=True)  # in kg
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    
    def __str__(self):

        return self.username

    @property
    def bmi(self):
        """Calculate current BMI"""
        if self.height and self.weight:
            return round(self.weight / ((self.height / 100) ** 2), 2)
        return None


class BMIHistory(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='bmi_history')
    bmi = models.FloatField()
    weight = models.FloatField()
    height = models.FloatField()
    date = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['date']  # ensures chronological order

    def __str__(self):
        return f"{self.member.username} - BMI {self.bmi} on {self.date}"

