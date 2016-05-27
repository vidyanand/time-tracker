import os

from webapp2 import RequestHandler
from jinja2 import Environment as jinja2_Environment, \
    FileSystemLoader as jinja2_FileSystemLoader


class RequestHandlerConfigured(RequestHandler):
    template_dir = os.path.join(
        os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir)),
        'templates')

    jinja_env = jinja2_Environment(
        loader=jinja2_FileSystemLoader(template_dir)
    )

    def render(self, template, **kwargs):
        template_rendered = self.jinja_env.get_template(
            template).render(kwargs)
        self.response.out.write(template_rendered)
