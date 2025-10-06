from rest_framework import serializers
from .models import Member, BMIHistory
from trainer.models import Workout, Attendance, Diet, BMI
from admin_pannel.models import Plan
from trainer.models import Trainer


class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainer
        fields = ["id", "name", "email", "phone_number"]


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ["id", "name", "duration_days", "price"]


class BMIHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BMIHistory
        fields = ["date", "bmi", "weight", "height"]


class MemberProfileSerializer(serializers.ModelSerializer):
    plan = PlanSerializer()
    trainer = TrainerSerializer()

    class Meta:
        model = Member
        fields = [
            "id",
            "username",
            "name",
            "email",
            "gender",
            "join_date",
            "height",
            "weight",
            "plan",
            "trainer",
        ]


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ["id", "details", "created_at"]


class DietSerializer(serializers.ModelSerializer):
    trainer = TrainerSerializer()

    class Meta:
        model = Diet
        fields = ["id", "diet_time", "details", "trainer", "created_at"]


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ["date", "status"]


class BMISerializer(serializers.ModelSerializer):
    class Meta:
        model = BMI
        fields = ["height_cm", "weight_kg", "bmi_value", "created_at"]


class MemberDashboardSerializer(serializers.ModelSerializer):
    plan = PlanSerializer()
    trainer = TrainerSerializer()
    latest_bmi = serializers.SerializerMethodField()
    attendance_rate = serializers.SerializerMethodField()
    total_workouts = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = '__all__'


from rest_framework import serializers
from .models import Member, BMIHistory
from trainer.models import Workout, Attendance, Diet, BMI
from admin_pannel.models import Plan
from trainer.models import Trainer


class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainer
        fields = ["id", "name", "email", "phone_number"]


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ["id", "name", "duration_days", "price"]


class BMIHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BMIHistory
        fields = ["date", "bmi", "weight", "height"]


class MemberProfileSerializer(serializers.ModelSerializer):
    plan = PlanSerializer()
    trainer = TrainerSerializer()

    class Meta:
        model = Member
        fields = [
            "id",
            "username",
            "name",
            "email",
            "gender",
            "join_date",
            "height",
            "weight",
            "plan",
            "trainer",
        ]


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ["id", "details", "created_at"]


class DietSerializer(serializers.ModelSerializer):
    trainer = TrainerSerializer()

    class Meta:
        model = Diet
        fields = ["id", "diet_time", "details", "trainer", "created_at"]


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ["date", "status"]


class BMISerializer(serializers.ModelSerializer):
    class Meta:
        model = BMI
        fields = ["height_cm", "weight_kg", "bmi_value", "created_at"]


class MemberDashboardSerializer(serializers.ModelSerializer):
    plan = PlanSerializer()
    trainer = TrainerSerializer()
    latest_bmi = serializers.SerializerMethodField()
    attendance_rate = serializers.SerializerMethodField()
    total_workouts = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = [
            "username",
            "name",
            "plan",
            "trainer",
            "attendance_rate",
            "total_workouts",
            "latest_bmi",
        ]

    def get_latest_bmi(self, obj):
        latest = obj.bmis.order_by("-created_at").first()
        return BMISerializer(latest).data if latest else None

    def get_attendance_rate(self, obj):
        total = obj.attendances.count()
        present = obj.attendances.filter(status="Present").count()
        return round((present / total) * 100, 2) if total > 0 else 0

    def get_total_workouts(self, obj):
        return obj.workouts.count()
        fields = [
            "username",
            "name",
            "plan",
            "trainer",
            "attendance_rate",
            "total_workouts",
            "latest_bmi",
        ]

    def get_latest_bmi(self, obj):
        latest = obj.bmis.order_by("-created_at").first()
        return BMISerializer(latest).data if latest else None

    def get_attendance_rate(self, obj):
        total = obj.attendances.count()
        present = obj.attendances.filter(status="Present").count()
        return round((present / total) * 100, 2) if total > 0 else 0

    def get_total_workouts(self, obj):
        return obj.workouts.count()
