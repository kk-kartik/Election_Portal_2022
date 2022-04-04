from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude=["password"]

class ImportantdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imporatant_date
        fields =["title","date","id"]

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields ='__all__'

class EuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = EUser
        fields =['id','name','roll_number','degree','hostel','branch','email']

class CandidateSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField()
    class Meta:
        model = Candidate
        exclude = ['election']

class CandidatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields ='__all__'
        # exclude = ['image','agenda_pdf']

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields ='__all__'