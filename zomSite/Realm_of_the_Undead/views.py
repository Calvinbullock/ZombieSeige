from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def server_index(request):
    return render(request, "index.html")
 
def game_page(request):
    return render(request, "game.html")

def test_page(request):
    return render(request, "test.html")

def my_view(request):
  context = {'image_path': 'static/assets/player_male.png'}
  return context
