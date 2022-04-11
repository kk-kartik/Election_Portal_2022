from django.contrib import admin
from .models import *

admin.site.register(EUser)
class EuserAdnmin(admin.ModelAdmin):
    list_display = ['id','email','name']

@admin.register(Voter)
class VoterAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Voter._meta.get_fields()]

@admin.register(Election)
class ElectionAdmin(admin.ModelAdmin):
    list_display = ['id','name','name_slug']

@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ['id','title']

admin.site.register(Candidate)

admin.site.register(Credentials)
admin.site.register(Debate)

@admin.register(Faq)
class FAQsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Faq._meta.get_fields()]

@admin.register(Imporatant_date)
class Imporatant_dateAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Imporatant_date._meta.get_fields()]

@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Statistic._meta.get_fields()]



