#!/usr/bin/env python

from google.appengine.ext import db

# These classes define the data objects
# that you will be able to store in
# AppEngine's data store.

class Event(db.Model):
    def __init__(self):
        name = db.StringProperty(required = True)
        pw_hash = db.StringProperty(required = True)
        email = db.StringProperty()

    def by_id(self, uid):
        return self.get_by_id(uid, parent = users_key())