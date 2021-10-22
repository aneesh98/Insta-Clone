import os
from pathlib import Path
from django.conf import settings
import yaml

def clear_directory(dir_path):
    root_path = Path(settings.MEDIA_ROOT)
    path = Path.joinpath(root_path, dir_path)
    try:
        for file in os.listdir(path):
            abs_path = Path.joinpath(path, file)
            if os.path.isfile(abs_path):
                os.remove(abs_path)
    except FileNotFoundError:
        return

def read_config_file():
    with open("configuration/file_config.yaml", "r") as file:
        config = yaml.safe_load(file)
    return config

config_obj = read_config_file()

def get_profile_picture_path(instance, filename):
    base_path = Path(config_obj.get('user_file_upload_dirs').get('profile_picture'))
    final_path = Path.joinpath(base_path, str(instance.user.id), filename)
    return final_path

def get_user_images_path(instance, filename):
    base_path = Path(config_obj.get('user_file_upload_dirs').get('custom_images'))
    final_path = Path.joinpath(base_path, str(instance.user.id), filename)
    return final_path
