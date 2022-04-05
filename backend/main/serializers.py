from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User


class WitnessSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Witness
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude=["password"]

class ImportantdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imporatant_date
        fields =["title","date","id"]

class CandidateReadSerializer(serializers.ModelSerializer):
    # witnesses = WitnessSerialzer(many=True)
    class Meta:
        model = Candidate
        fields = "__all__"
        depth = 1

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        exclude=["election"]

class PositionReadSerializer(serializers.ModelSerializer):
    candidates_p = CandidateReadSerializer(many=True)
    class Meta:
        model = Position
        fields = "__all__"
        depth=1


class EuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = EUser
        fields =['id','name','roll_number','degree','hostel','branch','email']

class CandidateSerializer(serializers.ModelSerializer):
    # witnesses = WitnessSerialzer(many=True)
    class Meta:
        model = Candidate
        exclude = ['election',"user"]
    
    # def create(self,validated_data,*args, **kwargs):
    #     witness = validated_data.pop("witness",None)
    #     instance = super(CandidateSerializer,self).create(validated_data, *args, **kwargs)
    #     for w in witness:
    #         witness_obj = WitnessSerialzer(w,context=self.context)
    #         witness_obj.save(candidate=instance)
    #     return instance
    


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        exclude = ["election"]