from rest_framework import serializers
from .models import Trainer, Workout, Attendance, Diet, BMI
from member.models import Member

# Trainer Serializer
class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainer
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

# Workout Serializer
class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'

# Attendance Serializer
class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

# Diet Serializer
class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields = '__all__'

# BMI Serializer
class BMISerializer(serializers.ModelSerializer):
    class Meta:
        model = BMI
        fields = '__all__'
