# accounts/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user_view, name='tenant-register'),
    path('login/', views.login_user_view, name='user-login'),
    path('logout/', views.logout_user_view, name='logout'),
    path('forget-password/', views.forget_password_view, name='forget-password'),
    path('reset-password/<int:uid>/<str:token>/', views.reset_password_view, name='reset-password'),

]
