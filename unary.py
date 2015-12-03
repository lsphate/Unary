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

    def render_json(self):
        pass

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
                        "host_name": self.request.get("hostname"),
                        "event_desc": self.request.get("describe"),
                        "event_times": self.request.get_all("timestamp")
                    }
        event_json = simplejson.dumps(event_obj)
        Event.create(event_id, event_json)
        self.render('/create.html', event_id=event_id)

class GuestPage(Handler):
    def get(self):
        event_id = self.request.get("eventid")
        # event_json = Event.
        self.render("guest.html")

app = webapp2.WSGIApplication([
    ('/', HomePage),
    ('/create', CreatePage),
    ('/host', HostPage),
    ('/guest', GuestPage)
], debug=True)

