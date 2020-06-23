import random
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from rest_framework.decorators import api_view, authentication_classes ,permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from .forms import TweetForm
from .models import Tweet
from .serializers import TweetSerializers, TweetActionSerializer, TweetCreateSerializers

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# Create your views here.
def home_view(request, *args, **kwargs):
    #return HttpResponse(f'<h1> Hello World</h1>')
    # username = None
    # if request.user.is_authenticated:
    #     username = request.user.username
    return render(request, "pages/feed.html")

def tweets_list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")

def tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/detail.html", context={"tweet_id": tweet_id})

# def tweets_profile_view(request, username, *args, **kwargs):
#     return render(request, "tweets/detail.html", context={"profile_username": username})

# These are commented as they are no more local so removing the local
# def local_tweets_list_view(request, *args, **kwargs):
#     return render (request, "tweets/list.html")
#
# def local_tweets_detail_view(request, tweet_id, *args, **kwargs):
#     return render (request, "tweets/detail.html", context={"tweet_id": tweet_id})
#
# def local_tweets_profile_view(request, username, *args, **kwargs):
#     return render(request, "tweets/detail.html", context={"profile_username": username})



# These are all shifted to the views in api
# @api_view(['POST']) # http method the client has to send  is == POST
# @permission_classes([IsAuthenticated]) # only authenticated people can do tweets
# # @authentication_classes([SessionAuthentication])
# def tweet_create_view(request, *args, **kwargs):
#     # serializer = TweetSerializers(data=request.POST or None)
#     # print("serializer:", serializer)
#     #if serializer.is_valid():
#     print(request.data)
#     serializer = TweetCreateSerializers(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(user=request.user)
#         # obj = serializer.save(user=request.user)
#         # print("obj:", obj)
#         # obj.save()
#         #return JsonResponse(serializer.data, status=201)
#     #return JsonResponse({}, status=400)
#         return Response(serializer.data, status=201)
#     return Response({}, status=400)
#
#
# @api_view(['GET'])
# def tweet_detail_view(request, tweet_id, *args, **kwargs):
#     qs = Tweet.objects.filter(id=tweet_id)
#     if not qs.exists():
#         return Response({}, status=404)
#     obj = qs.first()
#     serializer = TweetSerializers(obj)
#     return Response(serializer.data, status=200)
#
# @api_view(['GET'])
# def tweet_list_view(request, *args, **kwargs):
#     qs = Tweet.objects.all()
#     username = request.GET.get('username') # url pass this as a parameter as ?username=Sarthak
#     print(username)
#     if username != None:
#         qs = qs.filter(user__username__iexact=username)
#     serializer = TweetSerializers(qs, many=True)
#     return Response(serializer.data, status=200)
#
# @api_view(['DELETE', 'POST', 'GET'])
# @permission_classes([IsAuthenticated])
# def tweet_delete_view(request, tweet_id, *args, **kwargs):
#     qs = Tweet.objects.filter(id=tweet_id)
#     if not qs.exists():
#         return Response({}, status=404)
#     qs = qs.filter(user= request.user) # delete the posts by a particular user only
#     if not qs.exists():
#         return Response({"message": "You cannot delete this tweet"}, status=401)
#     obj = qs.first()
#     obj.delete()
#     # No need for it now serializer = TweetSerializers(obj)
#     return Response({"message": "Tweet Removed"}, status=200)
#
# @api_view(['DELETE', 'POST', 'GET'])
# @permission_classes([IsAuthenticated])
# def tweet_action_view(request, *args, **kwargs):
#
#     """ Action options are like, unlike and retweet. ID is required"""
#     serializer = TweetActionSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         data = serializer.validated_data
#         tweet_id = data.get("id")
#         action = data.get("action")
#         content = data.get("content")
#     qs = Tweet.objects.filter(id=tweet_id)
#     if not qs.exists():
#         return Response({}, status=404)
#     obj = qs.first()
#     if action == "like":
#         obj.likes.add(request.user)
#         serializer = TweetSerializers(obj)
#         return Response(serializer.data, status=200)
#     elif action == "unlike":
#         obj.likes.remove(request.user)
#         serializer = TweetSerializers(obj)
#         return Response(serializer.data, status=200)
#     elif action == "retweet":
#         new_tweet = Tweet.objects.create(user=request.user, parent=obj, content=content,)
#         serializer = TweetSerializers(new_tweet)
#         return Response(serializer.data, status=201)
#
#     #if request.user in obj.likes.all():
#      #   obj.likes.remove(request.user)
#     #else:
#      #   obj.likes.add(request.user)
#     # No need for it now serializer = TweetSerializers(obj)
#     return Response({}, status=200)
#
# def tweet_create_view_pure_django(request, *args, **kwargs):
#     user = request.user
#     if not request.user.is_authenticated:
#         user = None
#         if request.is_ajax():   # Both type of requests are handled here normal Http request and Json request
#             return JsonResponse({}, status = 401)
#         return redirect(settings.LOGIN_URL)
#     print("ajax", request.is_ajax())
#     form = TweetForm(request.POST or None)
#     next_url = request.POST.get("next") or None
#     '''print("next_url", next_url)'''
#     if form.is_valid():
#         obj = form.save(commit=False)
#         #do other form related logic
#         obj.user = user       # notice the 3 user variable added later just to keep a check whether the user is authenticated before making a tweet
#         obj.save()
#         if request.is_ajax():
#             return JsonResponse(obj.serialize(), status=201 ) #typically used for created items 201
#
#         if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
#             return redirect(next_url)
#         form = TweetForm() # re-initializing the form as a blank form at the end again
#         if form.errors:
#             if request.is_ajax():
#                 return JsonResponse(form.errors, status = 400)
#     return render(request, 'components/form.html', context={"form": form})
#
#
#
# def tweet_list_view_pure_django(request, *args, **kwargs):
#     """ REST API VIEW
#     Consume by JavaScript or Swift/JAva/ios/Android
#     return json data
#     """
#
#     qs = Tweet.objects.all()
#     tweets_list = [ x.serialize() for x in qs]
#     data = {
#         "isUser": False,
#         "response": tweets_list,
#     }
#     return JsonResponse(data)
#
# def tweet_detail_view_pure_django(request, tweet_id,  *args, **kwargs):
#     """ REST API VIEW
#     Consume by JavaScript or Swift/Java/ios/Android
#     return json data
#     """
#
#     data = {
#         "id": tweet_id,
#         #"content": obj.content,
#         # "image_path": obj.image.url,
#     }
#     status = 200
#     try:
#         obj = Tweet.objects.get(id=tweet_id)
#         data['content'] = obj.content
#     except:
#         data['message'] = 'Not found'
#         status = 404
#
#
#     return JsonResponse(data, status=status)