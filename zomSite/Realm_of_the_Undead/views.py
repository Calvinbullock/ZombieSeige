from django.shortcuts import render

# Create your views here.

def server_index(request):
    return render(request, "index.html")
    
