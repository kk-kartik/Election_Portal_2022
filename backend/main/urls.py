from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("imp_dates",viewset=views.ImportantDatesViewSet,basename="imp_dates")
router.register("candidates",viewset=views.CandidatesViewSet,basename="candidates")
router.register("positions",viewset=views.PositionsViewSet,basename="positions")
router.register("faqs",viewset=views.FAQViewSet,basename="faqs")

urlpatterns = [
    # path('all_positions/', views.all_positions.as_view(), name='all_positions'),
    # path('all_candidates/', views.all_candidates.as_view(), name='all_candidates'),
    # path('candidate_post/', views.candidate_post.as_view(), name='candidate_post'),
    # path('candidate_detail/', views.candidate_detail.as_view(), name='candidate_detail'),
    # path('all_eusers/', views.all_eusers.as_view(), name='all_eusers'),
    # path('all_faqs/', views.all_faqs.as_view(), name='all_faqs'),
    # path('faq_detailed/<int:id>/', views.faq_detailed.as_view(), name='faq_detailed'),
    path("registration/complete/",views.RegistrationCompleteView.as_view(),name="candidate_profile"),
    path("profile/",views.ProfileAPIView.as_view(),name="voter_profile"),
    path("",include(router.urls))
]
