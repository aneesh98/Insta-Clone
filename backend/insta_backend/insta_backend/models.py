from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
from django.db.models import ImageField

from .storage import OverwriteStorage


class CustomUser(AbstractUser):
    fav_color = models.CharField(blank=True, max_length=200)

class ProfilePicture(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    profile_photo = ImageField(upload_to='profile photos/', storage=OverwriteStorage())
