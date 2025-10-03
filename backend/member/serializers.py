from rest_framework import serializers
from .models import Member, BMIHistory

# Serializer for BMI history
class BMIHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BMIHistory
        fields = ['bmi', 'weight', 'height', 'date']


# Serializer for Member
class MemberSerializer(serializers.ModelSerializer):
    bmi_history = BMIHistorySerializer(many=True, read_only=True)  # nested serializer
    bmi = serializers.FloatField(source='bmi', read_only=True)      # current BMI

    class Meta:
        model = Member
        fields = [
            'id',
            'username',
            'name',
            'email',
            'gender',
            'join_date',
            'plan',
            'trainer',
            'height',
            'weight',
            'bmi',
            'bmi_history',
            'created_at',
            'updated_at',
        ]
