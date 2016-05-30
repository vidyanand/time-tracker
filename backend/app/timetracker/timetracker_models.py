from sys import exc_info as sys_exc_info

from google.appengine.ext import ndb
from google.appengine.api import search as gsearch

from ferris3.ndb import Model as f3Model


class TimeMarking(f3Model):
    time = ndb.DateTimeProperty()


class Project(f3Model):
    creator = ndb.UserProperty(indexed=False)
    name = ndb.StringProperty(indexed=True)
    description = ndb.TextProperty(indexed=True)
    created = ndb.DateTimeProperty()
    updated = ndb.DateTimeProperty(auto_now=True)
    time_markings = ndb.StructuredProperty(TimeMarking, repeated=True)

    def create_search_index(self, pid, name, description):
        project_id = str(pid)

        fields = [
            gsearch.TextField(name='project_name', value=name),
            gsearch.TextField(name='project_description', value=description)
        ]

        doc = gsearch.Document(doc_id=project_id, fields=fields)
        try:
            gsearch.Index('project_search').put(doc)
        except gsearch.Error:
            print "Document not indexed due to -> {0}".format(
                sys_exc_info()[0])

    def after_put(self, key):
        saved_project = key.get()
        self.create_search_index(key.id(), saved_project.name,
                                 saved_project.description)
