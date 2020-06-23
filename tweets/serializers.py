from django.conf import settings
from rest_framework import serializers
from.models import Tweet
from profiles.serializers import PublicProfileSerializer

MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
TWEET_ACTION_OPTIONS = settings.TWEET_ACTIONS_OPTIONS
#TWEET_ACTION_OPTIONS = ["like", "unlike", "retweet"]
# these are configuration settings so moved to settings

class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False )

    def validate_action(self, value):
        value = value.lower().strip("s") # 'Like ' --> like
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid option for tweets")
        return value

class TweetCreateSerializers(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)#serializers.SerializerMethodField(read_only=True) # added so that we can know which user posted which tweet when 94
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = ['user', 'id', 'content', 'likes', 'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()

    def validate_content(self, value):
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value

    # def get_user(self, obj): # 94 added
    #     return obj.user.id

class TweetSerializers(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True) #user = serializers.SerializerMethodField(read_only=True) # added so that we can know which user posted which tweet when 94
    likes = serializers.SerializerMethodField(read_only=True)
    # content = serializers.SerializerMethodField(read_only=True)
    # is_retweet = serializers.SerializerMethodField(read_only=True)
    # we don't actually need to call a serializer method again for a property that is on the object itself
    parent = TweetCreateSerializers(read_only=True)
    class Meta:
        model = Tweet
        fields = ['user', 'id', 'content', 'likes', 'is_retweet', 'parent', 'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()

    # def get_user(self, obj): # added newly for user identification of tweets
    #     return obj.user.id

    '''def get_content(self, obj):
        content = obj.content
        if obj.is_retweet:
            content = obj.parent.content

        return content'''

