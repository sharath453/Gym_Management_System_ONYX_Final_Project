from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def admin_home(request):
    return HttpResponse("Hi, this is the Admin Home Page")