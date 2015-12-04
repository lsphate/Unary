import jinja2
import os
import webapp2

from django.utils import simplejson
from Models.Models import Event

template_dir = os.path.join(os.path.dirname(__file__), "templates")
jinja_env    = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir), autoescape = True )

class Handler(webapp2.RequestHandler):
    def write(self, *a, **kw):
      self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
      template = jinja_env.get_template(template)
      return template.render(params)

    def render(self, template, **kw):
      self.write(self.render_str(template, **kw))

class HomePage(Handler):
    def get(self):
        self.render("home.html")

class HostPage(Handler):
    def get(self):
        self.render("host.html")

class CreatePage(Handler):
    def get(self):
        self.render("create.html")

    def post(self):
        event_id  = self.request.get("eventid")
        event_obj = {
                        "hostusr": self.request.get("hostname"),
                        "describe": self.request.get("describe"),
                        "guestusr": [],
                        "timestamps": self.request.get_all("timestamp")
                    }
        event_json = simplejson.dumps(event_obj)
        Event.create(event_id, event_json)
        self.render('create.html', event_id=event_id)

class GuestPage(Handler):
    def get(self):
        event_id = self.request.get("eventid")
        event_obj = Event.get_by_event_id(event_id)
        if event_obj:
            self.render("guest.html", event_id=event_id, event_json=event_obj.event_json)
        else:
            self.redirect('/')

class JoinPage(Handler):
    def get(self):
        self.render("join.html")

    def post(self):
        event_id  = self.request.get("eventid")
        insert_event_json = {
                                "guestname": self.request.get("guestname"),
                                "guestcolor": '#' + self.request.get("guestcolor"),
                                "available": self.request.get_all("available")
                            }
        event_json = Event.update(event_id, insert_event_json)
        self.render('join.html', event_id=event_id, event_json=event_json)

app = webapp2.WSGIApplication([
    ('/', HomePage),
    ('/create', CreatePage),
    ('/host', HostPage),
    ('/guest', GuestPage),
    ('/join', JoinPage)
], debug=True)

