from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User



class CredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credentials
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude=["password"]

class DebateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debate
        exclude=["election"]

class ImportantdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imporatant_date
        fields =["title","date","id"]

class EuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = EUser
        fields ="__all__"

class CandidateReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = "__all__"
        depth=1

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


class CandidateSerializer(serializers.ModelSerializer):
    nomination_status = serializers.ReadOnlyField()
    class Meta:
        model = Candidate
        exclude = ['election',"user","agenda_pdf"]

class CandidateOrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        exclude = ['election',"user"]
    


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        exclude = ["election"]


class CandidateBriefSerializer(serializers.ModelSerializer):
    branch = serializers.CharField(source="user.get_branch_display")
    position = serializers.CharField(source="position.title")
    name=serializers.CharField(source="user.name")
    class Meta:
        model = Candidate
        fields=["id","video","image","about","agenda_text","agenda_pdf","position","branch","name","nomination_status","tagline"]

class CandidateDetailSerializer(serializers.ModelSerializer):
    position = serializers.CharField(source="position.title")
    name=serializers.CharField(source="user.name")
    branch = serializers.CharField(source="user.get_branch_display")
    class Meta:
        model = Candidate
        fields = ["about","id","video","tagline","name","position","branch"]