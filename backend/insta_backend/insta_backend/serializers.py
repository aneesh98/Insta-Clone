from datetime import datetime

from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.core.mail import EmailMessage
from .models import CustomUser, ProfilePicture, UserImages
import yaml
from pathlib import Path
import pdb
import os

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
        data['userid'] = user_obj.id
        image_count = UserImages.objects.all().count()
        data['posts_count'] = image_count
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
        instance.is_valid = True
        instance.save()
        subject = 'PhotoShare Account Confirmation'
        message = 'Dear User, \n Thank you for registering at photoshare. \n Regards, Photoshare Admin'
        # print('Sending mail')
        # send_confirmation_email.delay(subject, message, validated_data.get('email'))
        # print('mail sent')
        return instance

class UserImageSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    image = serializers.ImageField()

    class Meta:
        model = UserImages
        fields = ('user_id', 'image')

    def create(self, data):
        curr_time = datetime.now()
        original_image_name = Path(data['image'].name)
        image_name = str(data['user_id']) + '_' + curr_time.strftime('%m_%d_%Y-%H:%M:%S')
        new_image_name = image_name + Path(original_image_name).suffix
        data['image'].name = new_image_name
        return UserImages.objects.create(**data)

class ProfilePictureSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    profile_photo = serializers.ImageField()
    class Meta:
        model = ProfilePicture
        fields = ('user_id', 'profile_photo')

    def create(self, data):
        # instance = self.Meta.model(**data)
        # extension = instance.profile_photo.name.split('.')[-1]
        # instance.profile_photo.name = str(instance.user_id) + '_profile_photo.' +extension
        # defaults = {
        #     'profile_photo': instance.profile_photo.namee
        # }
        # instance.save()
        # image_name = str(data['user_id']) + '_profile_photo.' + extension
        # defaults = {
        #     'profile_photo': image_name
        # }
        # user_id = data['user_id']
        # obj, created = ProfilePicture.objects.update_or_create(user_id=user_id, defaults=defaults)
        extension = data['profile_photo'].name.split('.')[-1]
        profile_photo_name = Path(data['profile_photo'].name)
        curr_time = datetime.now()
        image_name = str(data['user_id']) + '_profile_photo_' + curr_time.strftime('%m_%d_%Y-%H:%M:%S')
        profile_photo_obj = data['profile_photo']
        profile_photo_obj.name = image_name + profile_photo_name.suffix
        print(profile_photo_obj.name)
        defaults = {
            'profile_photo': profile_photo_obj
        }
        user_id = data['user_id']
        print(user_id)
        obj, created = ProfilePicture.objects.update_or_create(user_id=user_id, defaults=defaults)
        return obj

    def update(self, instance, validated_data):
        return

