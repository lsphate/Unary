import jinja2
import os
import webapp2

from Models import

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

class MainPage(Handler):
    def get(self):
        self.render("index.html")

class EventPage(Handler):
    def get(self):
        self.render("event.html")

app = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)

