from os import environ as os_environ
from json import dumps as json_dumps

from framework.request_handlers import RequestHandlerConfigured


ROOT = 'http://localhost:8080' \
       if os_environ.get('SERVER_SOFTWARE', '').startswith('Development') \
          else 'https://tarams-time-tracker-backend.appspot.com'
op_args = {'ROOT': json_dumps('{0}/_ah/api'.format(ROOT))}


class Home(RequestHandlerConfigured):
    def get(self):
        try:
            op_args.update({'search_str':
                            json_dumps(self.request.GET['search_str'])})
        except KeyError:
            pass
        self.render('index.html', op_args)


class IndvdualProject(RequestHandlerConfigured):
    def get(self, item_id):
        op_args.update({'item_id': json_dumps(item_id)})
        self.render('indvdual_project.html', op_args)
