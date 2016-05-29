from google.appengine.ext import ndb


class t_ndb(ndb.Model):

    @classmethod
    def get_by_ids(cls, model, ids):
        print "ids -> {0}".format(ids)
        keys = [ndb.Key(model, anid) for anid in ids]
        print "keys -> {0}".format(keys)
        models = ndb.get_multi(keys)
        print "models -> {0}".format(models)
        return models
