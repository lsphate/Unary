#!/usr/bin/env python

from django.utils import simplejson
from google.appengine.ext import db

def event_key(group='default'):
    return db.Key.from_path('event', group)

# These classes define the data objects
# that you will be able to store in
# AppEngine's data store.
class JsonProperty(db.TextProperty):
    def validate(self, value):
        return value

    def get_value_for_datastore(self, model_instance):
        result = super(JsonProperty, self).get_value_for_datastore(model_instance)
        result = simplejson.dumps(result)
        return db.Text(result)

    def make_value_from_datastore(self, value):
        try:
            value = simplejson.loads(str(value))
        except:
            pass
        return super(JsonProperty, self).make_value_from_datastore(value)

class Event(db.Model):
    event_id   = db.StringProperty(required=True)
    event_json = JsonProperty()

    @classmethod
    def get_by_event_id(cls, event_id):
        return Event.all().filter('event_id =', event_id).get()

    @classmethod
    def create(cls, event_id, event_json):
        new_event = Event(parent=event_key(), event_id=event_id, event_json=event_json)
        new_event.put()
