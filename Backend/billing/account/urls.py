# accounts/urls.py
from django.urls import path
from .views import TenantRegisterView

urlpatterns = [
    path('tenant/register/', TenantRegisterView.as_view(), name='tenant-register'),
]
