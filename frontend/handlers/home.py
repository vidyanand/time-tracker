from framework.request_handlers import RequestHandlerConfigured


class Home(RequestHandlerConfigured):
    def get(self):
        self.render('index.html')
