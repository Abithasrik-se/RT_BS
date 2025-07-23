# accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='profile_images/', null=True, blank=True)

    role = models.CharField(max_length=50, choices=[
        ('super_admin', 'Super Admin'),
        ('tenant_admin', 'Tenant Admin'),
        ('billing_manager', 'Billing Manager'),
        ('accountant', 'Accountant'),
        ('sales_user', 'Sales User'),
        ('customer_support', 'Customer Support'),
        ('read_only', 'Read-only User'),
    ])

    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.email
