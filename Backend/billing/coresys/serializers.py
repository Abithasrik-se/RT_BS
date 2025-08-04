from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'tenant',
            'name',
            'product_code',
            'barcode',
            'category',
            'price',
            'quantity',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at', 'product_code']
        


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

    def validate(self, data):
        tenant = data.get("tenant")
        phone = data.get("phone_number")

        if tenant.business_type != 'hotel': 
            if not phone:
                raise serializers.ValidationError("Phone number is required for fashion and hospital businesses.")
        return data




class BillItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = ['product', 'quantity', 'price', 'subtotal']

class BillSerializer(serializers.ModelSerializer):
    items = BillItemSerializer(many=True)

    class Meta:
        model = Bill
        fields = ['id', 'tenant', 'customer', 'bill_number', 'bill_date', 'total_amount', 'payment_method', 'notes', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        bill = Bill.objects.create(**validated_data)
        for item in items_data:
            BillItem.objects.create(bill=bill, **item)
        return bill
    


