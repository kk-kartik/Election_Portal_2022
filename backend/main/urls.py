from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("imp_dates",viewset=views.ImportantDatesViewSet,basename="imp_dates")
router.register("candidates",viewset=views.CandidatesViewSet,basename="candidates")
router.register("positions",viewset=views.PositionsViewSet,basename="positions")
router.register("faqs",viewset=views.FAQViewSet,basename="faqs")
router.register("debates",viewset=views.DebatesViewSet,basename="debates")

urlpatterns = [
    path("candidates/",views.PositionCandidatesView.as_view(),name="position_candidates"),
    path("candidate_pdf/<int:id>/",views.CandidateAgendaPdf.as_view(),name="position_candidate_pdf"),
    path("registration/complete/",views.RegistrationCompleteView.as_view(),name="candidate_profile"),
    path("profile/",views.ProfileAPIView.as_view(),name="voter_profile"),
    path("add_credentials/",views.CredentialCreateAPIView.as_view(),name="credentials_view"),
    path("",include(router.urls))
]
