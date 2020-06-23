import random

from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from ..serializers import PublicProfileSerializer

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import Profile

User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_profile_detail_view(request, username, *args, **kwargs):
#     current_user = request.user
#     to_follow_user = ??
#     return Response({}, status=200)
@api_view(['GET', 'POST'])
def profile_detail_api_view (request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail":"User not found"}, status=404)
        raise Http404
    profile_obj = qs.first()
    serializer = PublicProfileSerializer(instance=profile_obj, context={"request": request})
    # context = {      Copied from views.py
    #     "username": username,
    #     "profile": profile_obj,
    # }
    data = request.data or {}
    if request.method == "POST":
        me = request.user
        if profile_obj.user != me:
            action = data.get("action")
            if action == "follow":
                profile_obj.followers.add(me)
            elif action == "unfollow":
                profile_obj.followers.remove(me)
            else:
                pass
    serializer = PublicProfileSerializer(instance=profile_obj, context={"request": request})
    return Response(serializer.data, status=200)
    # return render(request, "profiles/detail.html", context)


# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def user_follow_view(request, username, *args, **kwargs):
#     me = request.user
#     other_user_qs = User.objects.filter(username=username)
#     # Profile.objects.filter(user__username=username).first()
#     if me.username == username:
#         my_followers = me.profile.followers.all()
#         return Response({"count":  my_followers.count()}, status=200)
#     if not other_user_qs.exists():
#         return Response({}, status=404)
#     other = other_user_qs.first()
#     profile = other.profile  #other way of accessing
#     data = request.data or {}
#     # try: could also be used in the way mentioned just above
#     #     data = request.data
#     # except:
#     #     pass
#     # print(data)
#     action = data.get("action")
#     if action == "follow":
#         profile.followers.add(me)
#     elif action == "unfollow":
#         profile.followers.remove(me)
#     else:
#         pass
#     # current_followers_qs = profile.followers.all()
#     # return Response({"count": current_followers_qs.count()}, status=200)
#     data = PublicProfileSerializer(instance=profile, context={"request": request})
#     return Response(data.data, status=200)

