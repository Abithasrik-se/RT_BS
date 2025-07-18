from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

class Tenant(models.Model):
    name = models.CharField(max_length=255)
    tenant_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
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

    remember_token = models.CharField(max_length=255, blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
