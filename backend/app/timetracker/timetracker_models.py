from google.appengine.ext import ndb
from ferris3.ndb import Model as f3Model


class Project(f3Model):
    creator = ndb.UserProperty(indexed=False)
    name = ndb.StringProperty()
    description = ndb.TextProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)
    updated = ndb.DateTimeProperty(auto_now=True)
