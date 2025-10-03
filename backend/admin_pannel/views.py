from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_home(request):
    return HttpResponse("Hi, this is the Admin Home Page")