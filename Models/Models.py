from django.utils import simplejson
from google.appengine.ext import db

def event_key(group='default'):
    return db.Key.from_path('event', group)

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

    @classmethod
    def update(cls, event_id, insert_event_json):
        event = Event.get_by_event_id(event_id)
        event_json_obj = simplejson.loads(event.event_json)
        if event_json_obj.has_key("guestusr"):
            event_json_obj["guestusr"].append(insert_event_json)
        else:
            event_json_obj["guestusr"] = [insert_event_json]
        event.event_json = simplejson.dumps(event_json_obj)
        event.put()
        return event.event_json
