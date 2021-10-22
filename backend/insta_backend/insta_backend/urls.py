from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static
from . import views
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPairWithColorView, CustomUserCreate, HelloWorld, ProfilePictureUpload

urlpatterns = [
    path('', views.index),
    path('user/create', CustomUserCreate.as_view(), name='create_user'),
    path('token/obtain', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', HelloWorld.as_view(), name='hello_world'),
    path('setdp/', ProfilePictureUpload.as_view(), name='profile_picture_upload'),
    path('getdp/<int:pk>/', views.get_profile_picture_path),
    path('upload_image/', views.post_user_images),
    path('explore/', views.ExploreUsers.as_view(), name='explore_users'),
    path('user_images/<int:user_id>', views.get_user_images),
    path('search/<str:user_name>', views.search_user)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)