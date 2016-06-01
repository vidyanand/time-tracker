/* Sign In */

$('.google-login-button').on('click', function(e){
    google_signin();
});

/* Project Search */

function listSearchResult(response) {
    $('.project-individual-container').remove();

    response.items.forEach(function(item){
        $('.projects-nav-button-forward').before($(make_project_html(item)));
    });

    $('.projects-nav-button-forward').hide();
    $('.projects-nav-button-backward').hide();

    page = 1;
}

function searchProjects (searchBy) {
    if (typeof gapi.client.ferris !== 'undefined') {
        gapi.client.ferris.project.search(
            {'search_by': searchBy}
        ).execute( function(response) {
            if (!response.error) {
                listSearchResult(response);
                $(".not-signed-in-alert").hide();
            } else {
                console.log(response.error);
            }
        });
    } else {
        $(".not-signed-in-alert").show();
    }
}

$(".search-button").click( function () {
    var searchText = $(".search-text").val();

    if ($(this).hasClass('navigate-to-home')) {
        window.location.href = "/?search_str=" + searchText;
    }

    searchProjects(searchText);

    $(".search-text").val('');
});

/* Not signed in alert */

$(".close-not-signed-in-alert").click( function () {
    $(".not-signed-in-alert").hide();
});

