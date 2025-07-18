# accounts/serializers.py
from rest_framework import serializers
from .models import Tenant, CustomUser

class TenantRegistrationSerializer(serializers.Serializer):
    tenant_name = serializers.CharField()
    tenant_id = serializers.CharField()
    email = serializers.EmailField()
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    def create(self, validated_data):
        tenant = Tenant.objects.create(
            name=validated_data['tenant_name'],
            tenant_id=validated_data['tenant_id']
        )
        user = CustomUser.objects.create_user(
            tenant=tenant,
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            role='tenant_admin',
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        return user
