from google.appengine.ext import ndb


class t_ndb(ndb.Model):

    @classmethod
    def get_by_ids(cls, model, ids):
        keys = [ndb.Key(model, anid) for anid in ids]
        return ndb.get_multi(keys)
