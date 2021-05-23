from celery.utils.log import get_task_logger
from django.core.mail import EmailMessage
from django.conf import settings
import sys
sys.path.append("/home/aneesh/Desktop/'Side Projects'/clone-apps/instagram-clone/backend/insta_backend")
from app_server.celery import app
logger = get_task_logger(__name__)

def email_task(subject, message, to):
    mail = EmailMessage(subject=subject, body=message, to=[to],
                        from_email=settings.EMAIL_HOST_USER)
    mail.content_subtype = 'html'
    mail.send()

@app.task(name='send_confirmation_email')
def send_confirmation_email(subject, message, to):
    logger.info("Sent conf email")
    return email_task(subject, message, to)

