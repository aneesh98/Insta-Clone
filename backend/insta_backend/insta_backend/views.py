from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions, status
from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializer


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


class HelloWorld(APIView):
    # permission_classes = (permissions.AllowAny,)
    def get(self, request):
        return Response(data={'data': 'hello'}, status=status.HTTP_200_OK)
