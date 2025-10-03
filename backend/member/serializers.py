from rest_framework import serializers
from .models import Member, BMIHistory

class MemberSerializer(serializers.ModelSerializer):
    bmi = serializers.ReadOnlyField()  # so BMI gets included but not overwritten

    class Meta:
        model = Member
        fields = '__all__'


class BMIHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BMIHistory
        fields = '__all__'
