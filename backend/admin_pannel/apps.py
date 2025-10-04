from django.apps import AppConfig


class AdminPannelConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'admin_pannel'

    def ready(self):
        import admin_pannel.signals
