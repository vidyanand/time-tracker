$('#googleSignInButton').on('click', function(e){
    google_signin();
});
$('#googleSignOutButton').on('click', function(e){
    google_signout();
});

function on_user_authed() {
    $('#anonymousSubmit').hide();
    $('#authedSubmit').show();
}

function on_gauth_signout() {
    $('#authedSubmit').hide();
    $('#anonymousSubmit').show();
}

var page = 1;
var toPageNav = {};
function on_ferris_loaded() {
    load_projects();
}

function load_projects(pageToken, navigation){
    gapi.client.ferris.project.paginated_list(
        {'pageToken': pageToken}
    ).execute(function(r){
        $('.project-individual-container').remove();

        r.items.forEach(function(item){
            $('.projects-nav-button-forward').before($(make_project_html(item)));
        });

        if (navigation == 'forward') {
            page++;
        } else if (navigation == 'backward') {
            page--;
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
    });
}

$('.projects-nav-button-forward').click( function () {
    load_projects(toPageNav[page + 1], 'forward');
});

$('.projects-nav-button-backward').click( function () {
    load_projects(toPageNav[page - 1], 'backward');
});

function make_project_html(item){
    return '<div class="panel panel-default project-individual-container"><div class="panel-heading project-name">' +
        item.name +
        '</div><div class="panel-body project-description">' +
        item.description +
        '</div></div>'
}

/* This handles form submission and calls our endpoint to insert a new post */
$('#newPostForm').on('submit', function(e){
    // keep the form from submitting the old-fashioned way.
    e.preventDefault();

    // Get the value of the textarea.
    var content = $('#newPostForm textarea[name=content]').val();

    // Submit our new post to the endpoint.
    gapi.client.ferris.guestbook.insert({content: content}).execute(function(r){
        /* Insert the newly created post at the top of the list */
        $('#postsContainer').prepend($(make_post_html(r)));
    });

    // Clear the textarea
    $('#newPostForm textarea[name=content]').val('');
});
