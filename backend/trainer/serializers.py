from rest_framework import serializers
from .models import Trainer, Workout, Attendance, Diet, BMI
from member.serializers import MemberSerializer

# -----------------------------
# Trainer Serializer
# -----------------------------
class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainer
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

# -----------------------------
# Workout Serializer
# -----------------------------
class WorkoutSerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)
    trainer = serializers.StringRelatedField(read_only=True)

    member_id = serializers.PrimaryKeyRelatedField(
        queryset=MemberSerializer.Meta.model.objects.all(),
        source='member',
        write_only=True
    )
    trainer_id = serializers.PrimaryKeyRelatedField(
        queryset=Trainer.objects.all(),
        source='trainer',
        write_only=True
    )

    class Meta:
        model = Workout
        fields = '__all__'

# -----------------------------
# Diet Serializer
# -----------------------------
class DietSerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)
    trainer = serializers.StringRelatedField(read_only=True)

    member_id = serializers.PrimaryKeyRelatedField(
        queryset=MemberSerializer.Meta.model.objects.all(),
        source='member',
        write_only=True
    )
    trainer_id = serializers.PrimaryKeyRelatedField(
        queryset=Trainer.objects.all(),
        source='trainer',
        write_only=True
    )

    class Meta:
        model = Diet
        fields = '__all__'

# -----------------------------
# BMI Serializer
# -----------------------------
class BMISerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)
    trainer = serializers.StringRelatedField(read_only=True)

    member_id = serializers.PrimaryKeyRelatedField(
        queryset=MemberSerializer.Meta.model.objects.all(),
        source='member',
        write_only=True
    )
    trainer_id = serializers.PrimaryKeyRelatedField(
        queryset=Trainer.objects.all(),
        source='trainer',
        write_only=True
    )

    class Meta:
        model = BMI
        fields = '__all__'

# -----------------------------
# Attendance Serializer
# -----------------------------
class AttendanceSerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)
    trainer = serializers.StringRelatedField(read_only=True)

    member_id = serializers.PrimaryKeyRelatedField(
        queryset=MemberSerializer.Meta.model.objects.all(),
        source='member',
        write_only=True
    )
    trainer_id = serializers.PrimaryKeyRelatedField(
        queryset=Trainer.objects.all(),
        source='trainer',
        write_only=True
    )

    class Meta:
        model = Attendance
        fields = '__all__'

# -----------------------------
# Member View for Trainer (read-only)
# -----------------------------
class MemberForTrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberSerializer.Meta.model
        fields = '__all__'
