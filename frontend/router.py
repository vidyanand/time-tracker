from webapp2 import WSGIApplication, Route

routes = WSGIApplication(
    routes=[
        Route('/', handler='handlers.home.Home'),
        Route('/projects/<item_id>', handler='handlers.home.IndvdualProject'),
    ]
)
