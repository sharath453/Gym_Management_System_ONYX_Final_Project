from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def member_home(request):
    return HttpResponse("Hi, this is the Member Home Page")