from json import dumps as json_dumps

from framework.request_handlers import RequestHandlerConfigured


class Home(RequestHandlerConfigured):
    def get(self):
        op_args = {}
        try:
            op_args['search_str'] = json_dumps(self.request.GET['search_str'])
        except KeyError:
            pass
        self.render('index.html', op_args)


class IndvdualProject(RequestHandlerConfigured):
    def get(self, item_id):
        self.render('indvdual_project.html', {'item_id': json_dumps(item_id)})
