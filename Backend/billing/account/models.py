# accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager


class Tenant(models.Model):
    company_name = models.CharField(max_length=255)
    business_type = models.CharField(max_length=100, choices=[
        ('hotel', 'Hotel'),
        ('fashion', 'Fashion'),
        ('hospital', 'Hospital'),
    ])
    admin_email = models.EmailField()
    contact_info = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='users',null=True)
    is_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=6, blank=True)


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
    
    
    

