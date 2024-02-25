from django.urls import path
from . import views

# This is used in the views file
urlpatterns = [
    path("index/", views.server_index, name="index"),
    path("game/", views.game_page, name="game_page"),
]
