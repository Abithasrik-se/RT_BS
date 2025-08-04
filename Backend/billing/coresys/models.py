from django.db import models
from django.core.exceptions import ValidationError
import uuid
from account.models import Tenant

# Create your models here.


class Product(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    product_code = models.CharField(max_length=100, unique=True, default=uuid.uuid4)
    barcode = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.tenant.business_type == 'hotel':
            raise ValidationError("Hotels are not allowed to create products.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.product_code})"
    

class Customer(models.Model):
    tenant = models.ForeignKey(Tenant,on_delete=models.CASCADE)
    name = models.CharField(max_length=100,blank=True,null=True)
    phone_no = models.PositiveIntegerField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self):
        if self.tenant.business_type == 'hotel':
            self.name =  None,
            self.phone_no = None
        super().save(*args,**kwargs)
        
    def __str__(self):
        return self.name or  'Anonymous'



class Bill(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    bill_number = models.CharField(max_length=100, unique=True)
    bill_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, choices=[
        ('cash', 'Cash'),
        ('card', 'Card'),
        ('upi', 'UPI'),
        ('credit', 'Credit'),
    ])
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Bill {self.bill_number}"
    

class BillItem(models.Model):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # price per item
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)  # quantity * price

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"