from django.shortcuts import render
from django.http import HttpResponse

# Trainer Home Page
def trainer_home(request):
    return HttpResponse("Hi, this is the Trainer Home Page")
