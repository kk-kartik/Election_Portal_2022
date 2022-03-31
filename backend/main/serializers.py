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