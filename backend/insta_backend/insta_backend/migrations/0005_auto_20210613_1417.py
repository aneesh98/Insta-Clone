# Generated by Django 3.1.7 on 2021-06-13 14:17

from django.db import migrations, models
import insta_backend.storage


class Migration(migrations.Migration):

    dependencies = [
        ('insta_backend', '0004_auto_20210612_1710'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profilepicture',
            name='profile_photo',
            field=models.ImageField(storage=insta_backend.storage.OverwriteStorage(), upload_to='profile photos/'),
        ),
    ]
