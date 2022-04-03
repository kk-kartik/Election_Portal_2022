from django.urls import path,include
from . import views

urlpatterns = [
    path('imp_dates/', views.get_important_dates.as_view(), name='get_important_dates'),
    path('imp_dates/<int:id>/', views.get_important_dates_detailed.as_view(), name='get_important_dates_detailed'),
    path('all_positions/', views.all_positions.as_view(), name='all_positions'),
    path('all_candidates/', views.all_candidates.as_view(), name='all_candidates'),
    path('candidate_post/', views.candidate_post.as_view(), name='candidate_post'),
    path('candidate_detail/', views.candidate_detail.as_view(), name='candidate_detail'),
    path('all_eusers/', views.all_eusers.as_view(), name='all_eusers'),
    path('all_faqs/', views.all_faqs.as_view(), name='all_faqs'),
    path('faq_detailed/<int:id>/', views.faq_detailed.as_view(), name='faq_detailed'),
]
