from rest_framework import permissions
from .models import Voter

class ElectionOrganizerWritePermission(permissions.BasePermission):
    """
    Global write permission check for election organizer(s).
    """
    message = 'Invalid Access! This API can be accessed only by one of the organizers of the election.'

    def has_permission(self, request, view):
        if view.action in ["list","retrieve"]:
            return True
        try:
            is_organizer = Voter.objects.filter(election_organizers__id=view.election.id,user__id=request.user.euser.id).exists()
            return is_organizer
        except Exception as err:
            print(repr(err))
            return False


class IsOrganizerOrCandidateWriteOnly(permissions.BasePermission):
    """
    Global write permission check for election organizer(s).
    """
    message = 'Invalid Access! This API can be accessed only by one of the organizers of the election.'

    def has_object_permission(self, request, view,obj):
        if view.action in ["list","retrieve","create"]:
            return True
        
        user = request.user
        election=view.election
        try:
            is_organizer = Voter.objects.filter(election_organizers__id=election.id,user__id=user.euser.id).exists()
            if is_organizer:
                return True
        except Exception as err:
            print(repr(err))
            
        try:
            euser = user.euser
            candidates = Candidate.objects.filter(election=election,user=euser)
            return candidates.filter(pk=obj.id).exists()
        except Exception as err:
            print(repr(err))
            return False
        
        


