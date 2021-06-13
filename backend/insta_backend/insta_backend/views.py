from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions, status
from .models import ProfilePicture
from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializer, ProfilePictureSerializer


# Create your views here.
def index(request):
    return HttpResponse('Hello, world. You\'re at the polls index')


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
        if serializer.is_valid():
            picture = serializer.save()
        return response

def get_profile_picture_path(request, pk):
    try:
        profile_picture = ProfilePicture.objects.get(user_id=pk)
    except ProfilePicture.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        profile_picture_obj = ProfilePictureSerializer(profile_picture)
        return JsonResponse(profile_picture_obj.data)

class HelloWorld(APIView):
    # permission_classes = (permissions.AllowAny,)
    def get(self, request):
        return Response(data={'data': 'hello'}, status=status.HTTP_200_OK)

