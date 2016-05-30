from datetime import datetime

from google.appengine.api import search as gsearch
from endpoints import get_current_user as get_current_guser

import ferris3 as f3

from framework.utils import t_ndb
from app.timetracker.timetracker_models import Project


ProjectMessage = f3.model_message(Project)
ProjectMessageCollection = f3.list_message(ProjectMessage)


@f3.auto_service
class ProjectService(f3.Service):

    @f3.auto_method(returns=ProjectMessage)
    def insert(self, request=(ProjectMessage,)):
        project = f3.messages.deserialize(Project, request)

        project.creator = get_current_guser()
        project.created_at = datetime.utcnow()

        project.put()

        return f3.messages.serialize(ProjectMessage, project)

    paginated_list = f3.hvild.paginated_list(Project, query=Project.query()
                                             .order(-Project.created_at))
    list = f3.hvild.list(Project)

    @f3.auto_method(returns=ProjectMessageCollection)
    def search(self, request, search_by=(str,)):
        search_results = gsearch.Index('project_search').search(search_by)
        p_ids = [int(doc.doc_id) for doc in search_results]
        projects = [project for project in t_ndb.get_by_ids(Project, p_ids)
                    if project is not None]

        if not projects:
            raise f3.NotFoundException()
        return f3.messages.serialize_list(ProjectMessageCollection, projects)
