from .models import *
from rest_framework import serializers

class ImportantdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imporatant_date
        fields = ['title','date']