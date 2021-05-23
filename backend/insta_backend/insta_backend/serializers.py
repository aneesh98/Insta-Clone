from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.core.mail import EmailMessage
from .models import CustomUser
import pdb

from .tasks.tasks import send_confirmation_email


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer, cls).get_token(user)
        token['fav_color'] = user.fav_color
        return token

    def validate(self, attrs):
        credentials = {
            'username': '',
            'password': attrs.get('password')
        }
        user_obj = CustomUser.objects.filter(email=attrs.get("username")).first()
        if user_obj:
            credentials['username'] = user_obj.username
        data = super().validate(credentials)
        data['username'] = user_obj.username
        return data

class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)


    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.is_valid = False
        instance.save()
        subject = 'PhotoShare Account Confirmation'
        message = 'Dear User, \n Thank you for registering at photoshare. \n Regards, Photoshare Admin'
        # print('Sending mail')
        send_confirmation_email.delay(subject, message, validated_data.get('email'))
        # print('mail sent')
        return instance