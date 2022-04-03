from rest_framework import permissions
from .models import Voter

class ElectionOrganizerWritePermission(permissions.BasePermission):
    """
    Global write permission check for election organizer(s).
    """
    message = 'Invalid Access! This API can be accessed only by one of the organizers of the election.'

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        is_organizer = Voter.objects.filter(election_organizers__id=view.election.id,user__id=request.user.id).exists()
        return is_organizer


class IsOrganizerOrCandidateWriteOnly(permissions.BasePermission):
    """
    Global write permission check for election organizer(s).
    """
    message = 'Invalid Access! This API can be accessed only by one of the organizers of the election.'

    def has_object_permission(self, request, view,obj):
        if request.method in permissions.SAFE_METHODS:
            return True
            
        user = request.user
        election=view.election
        is_organizer = Voter.objects.filter(election_organizers__id=election.id,user__id=user.id).exists()
        if is_organizer:
            return True
        
        euser = user.euser
        candidates = Candidate.objects.filter(election=election,user=euser)
        return candidates.filter(pk=obj.id).exists()
        
        


