# accounts/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user_view, name='tenant-register'),
    path('login/', views.login_user_view, name='user-login'),

]
