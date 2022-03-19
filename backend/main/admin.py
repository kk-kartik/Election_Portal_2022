from django.contrib import admin
from .models import *

@admin.register(EUser)
class EUserAdmin(admin.ModelAdmin):
    list_display = [field.name for field in EUser._meta.get_fields()]

@admin.register(Voter)
class VoterAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Voter._meta.get_fields()]

@admin.register(Election)
class ElectionAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Election._meta.get_fields()]

@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Position._meta.get_fields()]

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Candidate._meta.get_fields()]

@admin.register(Faq)
class FAQsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Faq._meta.get_fields()]

@admin.register(Imporatant_dates)
class Imporatant_datesAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Imporatant_dates._meta.get_fields()]

@admin.register(Statistics)
class StatisticsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Statistics._meta.get_fields()]



