from django.urls import path
from . import views

# This is used in the views file
urlpatterns = [
    path("index/", views.server_index, name="index"),
    path("game/", views.game_page, name="game_page"),
    path("test/", views.test_page, name="test_page"),
    path("static/assets/player_male.py", views.my_view, name="my_view"),
]
