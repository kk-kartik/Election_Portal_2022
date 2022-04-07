"""
Django settings for election_portal22 project.

Generated by 'django-admin startproject' using Django 4.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

from pathlib import Path
import environ

# Import the environment variables
env = environ.Env()
# reading .env file
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = 'django-insecure--zewv%x0y6f5vo%%p9z_=6d#v*^7xzk59^+k^f4*=6njj_n_b6'
SECRET_KEY = env("SECRET_KEY") # Raises django's ImproperlyConfigured exception if SECRET_KEY not in os.environ

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")
print(DEBUG)
DEBUG = not (DEBUG == 'false' or DEBUG == 'False') if isinstance(DEBUG, str) else True

print(DEBUG)

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    # 'django.contrib.sites',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    # 'django_auth_adfs',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    "dj_rest_auth",
    'dj_rest_auth.registration',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.microsoft',
    'main',
    "authentication",
    # 'rest_framework_swagger',
]
REST_USE_JWT = True

SITE_ID=1

CORS_REPLACE_HTTPS_REFERER=True
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsPostCsrfMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'django_auth_adfs.middleware.LoginRequiredMiddleware',
]


REST_FRAMEWORK={
    'DEFAULT_AUTHENTICATION_CLASSES': [
        "rest_framework.authentication.BasicAuthentication",
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}
if not DEBUG:
    REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"]=["rest_framework.renderers.JSONRenderer"]


REST_AUTH_SERIALIZERS = {
   "USER_DETAILS_SERIALIZER":"authentication.serializers.CustomUserDetailSerializer"
}

ROOT_URLCONF = 'election_portal22.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR/'templates',],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages'
            ],
        },
    },
]

ACCOUNT_LOGOUT_ON_GET = True

WSGI_APPLICATION = 'election_portal22.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db'/'db.sqlite3',
    }
}


if not DEBUG:
    print("Connecting to db....")
    DATABASES["default"]:{
            "ENGINE":"django.db.backends.postgresql_psycopg2",
            "NAME":env("DB_NAME"),
            "USER":env("DB_USER"),
            "HOST":env("DB_HOST"),
            "PORT":5432
    }


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = '/elections_api/static/'
MEDIA_URL = "/elections_api/media/"
STATICFILES_DIRS=[BASE_DIR/"static"]
STATIC_ROOT = BASE_DIR/"assets"
MEDIA_ROOT = BASE_DIR/"media"
# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# REST_FRAMEWORK = { 'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema' }





from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': "JWT SIGNING KEY",
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'email',
    'USER_ID_CLAIM': 'user_email',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}


CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "https://swc.iitg.ac.in",
    "http://localhost:3000"
]
ALLOWED_HOSTS=["swc.iitg.ac.in","localhost"]


CSRF_TRUSTED_ORIGINS = CORS_ALLOWED_ORIGINS

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
    CORS_ORIGIN_ALLOW_ALL = True
    ALLOWED_HOSTS = ["*"]



OUTLOOK_CLIENT_ID = env("OUTLOOK_CLIENT_ID")
OUTLOOK_CLIENT_SECRET = env("OUTLOOK_CLIENT_SECRET")
OUTLOOK_TENANT_ID = env("OUTLOOK_TENANT_ID")
GOOGLE_CLIENT_ID=env("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = env("GOOGLE_CLIENT_SECRET")

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        "APP":{
            "client_id":GOOGLE_CLIENT_ID,
            "secret":GOOGLE_CLIENT_SECRET,
            "key":""
        }
    },
    "microsoft":{
        'TENANT':OUTLOOK_TENANT_ID,
        "APP":{
            "client_id":OUTLOOK_CLIENT_ID,
            "secret":OUTLOOK_CLIENT_SECRET,
        }
    }
}


ACCOUNT_EMAIL_VERIFICATION="none"

###  SET AUTH COOKIE #####
JWT_AUTH_COOKIE = 'electiontoken'
JWT_AUTH_HTTPONLY = False
JWT_AUTH_SAMESITE = "None"
JWT_AUTH_SECURE = True

SOCIALACCOUNT_LOGIN_ON_GET=True
SESSION_COOKIE_NAME ="electionsessiontoken"
# SESSION_COOKIE_SAMSITE=JWT_AUTH_SAMESITE
# SESSION_COOKIE_SECURE = JWT_AUTH_SECURE
# SESSION_COOKIE_HTTPONLY = JWT_AUTH_HTTPONLY

LOGIN_REDIRECT_URL = "/elections_api/auth/login_success"
LOGOUT_REDIRECT_URL = LOGIN_REDIRECT_URL
CLIENT_URL = env("CLIENT_URL")
if not DEBUG:
    ACCOUNT_DEFAULT_HTTP_PROTOCOL='https'
