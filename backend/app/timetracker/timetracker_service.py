from endpoints import get_current_user as get_current_guser

import ferris3 as f3

from app.timetracker.timetracker_models import Project


ProjectMessage = f3.model_message(Project)


@f3.auto_service
class ProjectService(f3.Service):

    @f3.auto_method(returns=ProjectMessage)
    def insert(self, request=(ProjectMessage,)):
        project = f3.messages.deserialize(Project, request)

        project.creator = get_current_guser()

        project.put()

        return f3.messages.serialize(ProjectMessage, project)

    list = f3.hvild.list(Project)

    paginated_list = f3.hvild.paginated_list(Project, query=Project.query()
                                             .order(-Project.created))
