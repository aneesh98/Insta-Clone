from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os
from .file_utils import read_config_file
from storages.backends.s3boto3 import S3Boto3Storage


class OverwriteStorage(FileSystemStorage):

    def _save(self, name, content):
        print(name)
        self.delete(name)
        return super(OverwriteStorage, self)._save(name, content)

    def get_available_name(self, name, max_length=None):
        return name

class MediaStorage(S3Boto3Storage):
    bucket_name = 'photo-share-bucket1'