from .models import *
from rest_framework import serializers

class ImportantdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imporatant_date
        fields ='__all__'

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields ='__all__'

class EuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = EUser
        fields =['id','name','roll_number','degree','hostel','branch','email']

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        exclude = ['election']
        depth = 1

class CandidatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields ='__all__'
        # exclude = ['image','agenda_pdf']

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields ='__all__'