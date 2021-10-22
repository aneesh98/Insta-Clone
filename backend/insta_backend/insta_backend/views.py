from pathlib import Path

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions, status
from django.core import serializers as core_serializers
from . import models, serializers
from .file_utils import clear_directory
from .models import ProfilePicture, UserImages, CustomUser
from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializer, ProfilePictureSerializer, \
    UserImageSerializer
import yaml

# Create your views here.
def index(request):
    return HttpResponse('Hello, world. You\'re at the polls index')

class SkipAuth(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        return True

class ObtainTokenPairWithColorView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format='json'):
        print(request)
        response = {}
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                response = serializer.data
                response['success'] = 1
                return Response(response, status=status.HTTP_201_CREATED)
        response = serializer.errors
        response['success'] = 0
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

class ProfilePictureUpload(APIView):
    def post(self, request):
        serializer = ProfilePictureSerializer(data=request.data)
        response = Response({'uploaded': True}, status=status.HTTP_200_OK)
        with open("configuration/file_config.yaml", "r") as f:
            config = yaml.safe_load(f)
        base_path = Path(config.get('user_file_upload_dirs').get('profile_picture'))
        print(base_path)
        clear_directory(Path.joinpath(base_path, str(request.data['user_id'])))
        if serializer.is_valid():
            picture = serializer.save()
        return response

@api_view(['GET'])
def get_user_images(request, user_id):
    try:
        user_images = UserImages.objects.all().filter(user_id=user_id)
    except UserImages.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        user_images_obj = UserImageSerializer(user_images, many=True)
        return Response(user_images_obj.data)

@api_view(['POST'])
def post_user_images(request):
    if request.method == 'POST':
        serializer = UserImageSerializer(data=request.data)
        if serializer.is_valid():
            image_record = serializer.save()
            if image_record:
                response = serializer.data
                response['image_uploaded'] = 1
                return Response(response, status=status.HTTP_201_CREATED)
        response = serializer.errors
        response['image_uploaded'] = 0
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_profile_picture_path(request, pk):
    try:
        profile_picture = ProfilePicture.objects.get(user_id=pk)
    except ProfilePicture.DoesNotExist:
        profile_picture = ProfilePicture.objects.get(user_id=62)
    finally:
        if request.method == 'GET':
            profile_picture_obj = ProfilePictureSerializer(profile_picture)
            return JsonResponse(profile_picture_obj.data)

@api_view(['GET'])
def search_user(request, user_name):
    try:
        user_list = ProfilePicture.objects.all().select_related('user')
        filtered_user_list = user_list.values('user__username',  'user__first_name', 'user__last_name',
                                                   'profile_photo').\
                                                   filter(user__username__contains=user_name)
        data = list(filtered_user_list)
        new_data = []
        for item in data:
            new_dict = {}
            for x in item.keys():
                new_dict[x.split('__')[-1]] = settings.MEDIA_URL + item[x] if x == 'profile_photo' else item[x]
            new_data.append(new_dict)
            del item
        del data
    except Exception as e:
        print(e.__str__())
        return HttpResponse(status=404)
    if request.method == 'GET':
        return JsonResponse(new_data, safe=False)

class HelloWorld(APIView):
    # permission_classes = (permissions.AllowAny,)
    def get(self, request):
        return Response(data={'data': 'hello'}, status=status.HTTP_200_OK)

class ExploreUsers(APIView):
    def get(self, request):
        user = request.user
        last_five = models.CustomUser.objects.all().exclude(id=user.id)
        serialized_data = serializers.UserListSerializer(last_five, many=True, context={'request': request})
        return Response(data=serialized_data.data, status=status.HTTP_200_OK)