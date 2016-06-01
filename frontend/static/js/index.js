var page;
var toPageNav = {};

function list_projects(r, navigation) {
    $('.project-individual-container').remove();

    r.items.forEach(function(item){
        $('.projects-nav-button-forward').before($(make_project_html(item)));
    });

    if (navigation == 'forward') {
        page++;
    } else if (navigation == 'backward') {
        page--;
    } else {
        page = 1;
    }

    var pageToken = r.nextPageToken
    if (pageToken !== undefined) {
        toPageNav[page + 1] = pageToken;
        $('.projects-nav-button-forward').show();
    } else {
        $('.projects-nav-button-forward').hide();
    }

    if (page > 1) {
        $('.projects-nav-button-backward').show();
    } else {
        $('.projects-nav-button-backward').hide();
    }
}

function load_projects(pageToken, navigation){
    if (typeof gapi.client.ferris !== 'undefined') {
        gapi.client.ferris.project.paginated_list(
            {'pageToken': pageToken}
        ).execute(function(result){
            if (!result.error) {
                list_projects(result, navigation);
                $(".not-signed-in-alert").hide();
            } else {
                console.log(result.error);
            }
        });
    } else {
        $(".not-signed-in-alert").show();
    }
}

function on_ferris_loaded() {
    if (typeof searchStr == 'undefined') {
        load_projects();
    } else {
        searchProjects(searchStr);
    }
}

$('.create-project-button').click( function () {
    var projectName = $(".project-create-name").val();
    var projectDesc = $(".project-create-desc").val();

    if (typeof gapi.client.ferris !== 'undefined') {
        gapi.client.ferris.project.insert(
            {'name': projectName,
             'description': projectDesc}
        ).execute(function(response){
            if (!response.error) {
                load_projects();
                $(".not-signed-in-alert").hide();
            } else {
                console.log(response.error);
            }
        });
    } else {
        $(".not-signed-in-alert").show();
    }

    $(".project-create-name").val('');
    $(".project-create-desc").val('');
});

$('.projects-nav-button-forward').click( function () {
    load_projects(toPageNav[page + 1], 'forward');
});

$('.projects-nav-button-backward').click( function () {
    load_projects(toPageNav[page - 1], 'backward');
});

$('.project-header').click( function () {
    load_projects();
    $(".search-text").val("");
});

function make_project_html(item){
    return '<div class="panel panel-default project-individual-container"><div class="panel-heading project-name"><a href="/projects/' +
        item.id +
        '">' +
        item.name +
        '</a></div><div class="panel-body project-description">' +
        item.description +
        '</div></div>'
}
