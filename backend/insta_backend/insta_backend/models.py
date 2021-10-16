from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
from django.db.models import ImageField
from pathlib import Path
import yaml

from .file_utils import get_user_images_path
from .storage import OverwriteStorage, MediaStorage


class CustomUser(AbstractUser):
    fav_color = models.CharField(blank=True, max_length=200)
    followers = models.ManyToManyField("self", blank=True)
    following = models.ManyToManyField("self", blank=True)

def get_profile_picture_path(instance, filename):
    with open("configuration/file_config.yaml", "r") as file:
        config = yaml.safe_load(file)
    base_path = Path(config.get('user_file_upload_dirs').get('profile_picture'))
    final_path = Path.joinpath(base_path, str(instance.user.id), filename)
    return final_path


class ProfilePicture(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    profile_photo = ImageField(upload_to=get_profile_picture_path, storage=OverwriteStorage())

class UserImages(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    image = ImageField(upload_to=get_user_images_path, storage=MediaStorage())

class RecentSearch(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='searching_user')
    followed_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='searched_user')
