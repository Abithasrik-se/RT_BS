# accounts/views.py
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated



User = get_user_model()


@api_view(['POST'])
def register_user_view(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "message": "User registered successfully",
            "username": user.username,
            "email": user.email,
            "role": user.role
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def login_user_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Please provide both email and password.'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, email=email, password=password)

    if not user:
        return Response({'error': 'Username and password wrong'}, status=status.HTTP_401_UNAUTHORIZED)

    token, created = Token.objects.get_or_create(user=user)

    return Response({
        'token': token.key,
        'user': {
            'username': user.username,
            'email': user.email,
            'role': user.role
        }
    })



@api_view(['POST'])
def forget_password_view(request):
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist.'}, status=400)

    token = default_token_generator.make_token(user)
    reset_link = f"http://localhost:3000/reset-password/{user.pk}/{token}/"  # Replace with your frontend URL

    send_mail(
        subject='Password Reset Request',
        message=f'Click the link to reset your password: {reset_link}',
        from_email=None,
        recipient_list=[email],
    )

    return Response({'message': 'Password reset link sent to email.'})


@api_view(['POST'])
def reset_password_view(request, uid, token):
    try:
        user = User.objects.get(pk=uid)
    except User.DoesNotExist:
        return Response({'error': 'Invalid user.'}, status=400)

    if not default_token_generator.check_token(user, token):
        return Response({'error': 'Invalid or expired token.'}, status=400)

    password = request.data.get('password')
    if not password:
        return Response({'error': 'Password is required.'}, status=400)

    user.set_password(password)
    user.save()
    return Response({'message': 'Password reset successful.'})



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout_user_view(request):
    request.user.auth_token.delete()
    return Response({'message': 'Logout successful.'})
