"""
ASGI config for rope_pull project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter  # noqa

from django.urls import path  # noqa
from ws.consumers import PullConsumer
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rope_pull.settings')

application = ProtocolTypeRouter({
        "http": get_asgi_application(),
        "websocket": URLRouter(
                [
                    path("ws/", PullConsumer.as_asgi()),
                ]
            )
    }
)
