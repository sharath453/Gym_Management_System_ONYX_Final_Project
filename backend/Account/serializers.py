from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import User as User
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    role = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        role = data.get('role').capitalize()  # normalize to match choice

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid username or password")

        if not check_password(password, user.password):
            raise serializers.ValidationError("Invalid Password")

        if user.role != role:
            raise serializers.ValidationError(f"User is not a {role}")

        data['user'] = user
        return data