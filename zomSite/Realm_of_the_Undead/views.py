from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def server_index(request):
    return render(request, "index.html")
 
def game_page(request):
    return render(request, "game.html")

def map_file(request):
    full_path = "/~/Documents/_winter-2024-school-docs/appliedPrograming/ZombieSeige/zomSite/Realm_of_the_Undead/static/assets/"

    # Open the text file in read binary mode
    with open(f'{full_path}map.txt', 'rb') as f:
        # Read the file content
        file_content = f.read()

    # Set the content type header to text/plain
    response = HttpResponse(file_content, content_type='text/plain')

    # Optionally set the Content-Disposition header for download
    # response['Content-Disposition'] = f'attachment; filename="{filename}.txt"'

    return response
