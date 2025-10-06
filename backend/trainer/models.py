from django.db import models
# from member.models import Member

class Trainer(models.Model):
    username = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=15)
    join_date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.username


class Workout(models.Model):
    member = models.ForeignKey('member.Member', on_delete=models.CASCADE, related_name='workouts')
    trainer = models.ForeignKey(Trainer, on_delete=models.SET_NULL, null=True, related_name='workouts')
    details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.trainer} -> {self.member}"


class Attendance(models.Model):
    STATUS_CHOICES = (("Present", "Present"), ("Absent", "Absent"))
    member = models.ForeignKey('member.Member', on_delete=models.CASCADE, related_name='attendances')
    trainer = models.ForeignKey(Trainer, on_delete=models.SET_NULL, null=True, related_name='attendances')
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ('member', 'date')

    def __str__(self):
        return f"{self.member} - {self.date}"


class Diet(models.Model):
    member = models.ForeignKey('member.Member', on_delete=models.CASCADE, related_name='diets')
    trainer = models.ForeignKey(Trainer, on_delete=models.SET_NULL, null=True, related_name='diets')
    diet_time = models.TimeField()
    details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.trainer} -> {self.member} at {self.diet_time}"


class BMI(models.Model):
    member = models.ForeignKey('member.Member', on_delete=models.CASCADE, related_name='bmis')
    trainer = models.ForeignKey(Trainer, on_delete=models.SET_NULL, null=True, related_name='bmis')
    height_cm = models.FloatField()
    weight_kg = models.FloatField()
    bmi_value = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.height_cm and self.weight_kg:
            self.bmi_value = round(self.weight_kg / ((self.height_cm / 100) ** 2), 2)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.member} - BMI: {self.bmi_value}"
