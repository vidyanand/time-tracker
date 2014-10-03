import ferris3
import endpoints
from google.appengine.ext import ndb
import datetime


# We use ferris3.ndb.Model instead of ndb.Model so that we can use behaviors if we wanted.
class GuestbookPost(ferris3.ndb.Model):
    author = ndb.UserProperty(indexed=False)
    content = ndb.TextProperty()
    date = ndb.DateTimeProperty(indexed=True)


GuestbookPostMessage = ferris3.model_message(GuestbookPost)
GuestbookPostMessageCollection = ferris3.list_message(GuestbookPostMessage)


@ferris3.auto_service
class GuestbookService(ferris3.Service):

    @ferris3.auto_method(returns=GuestbookPostMessage)
    # The weird syntax on the request method is an annotation. We're telling
    # Ferris that we want the request to be of the type "GuestbookMessage".
    def insert(self, request=(GuestbookPostMessage,)):
        # Turn the request message into a ndb entity.
        post = ferris3.messages.deserialize(GuestbookPost, request)

        # Update the author field with the current user.
        post.author = endpoints.get_current_user()
        # And the date field with the current datetime
        post.date = datetime.datetime.utcnow()

        # Save it.
        post.put()

        # Return it back to the client.
        return ferris3.messages.serialize(GuestbookPostMessage, post)

    @ferris3.auto_method(returns=GuestbookPostMessageCollection)
    def list(self, request):
        # query the guestbook posts
        query = GuestbookPost.query().order(-GuestbookPost.date).fetch(20)

        # Transform it into a collection of messages.
        msg = ferris3.messages.serialize_list(GuestbookPostMessageCollection, query)

        return msg

    # Ferris 3 makes it super easy to do paginated lists. We could have just
    # used this as the list method above.
    paginated_list = ferris3.hvild.paginated_list(GuestbookPost, limit=20)
