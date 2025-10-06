from rest_framework import serializers
from .models import Trainer, Workout, Diet, BMI, Attendance

class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainer
        fields = '__all__'

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'

class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields = '__all__'

class BMISerializer(serializers.ModelSerializer):
    class Meta:
        model = BMI
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'
