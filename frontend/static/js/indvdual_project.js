function on_ferris_loaded() {
    load_project(itemID);
}

function on_user_authed() {
}

function on_gauth_signout() {
}

function populate_page(project) {
    $('.project-name').html("Project: " + project.name);
    $('.project-desc').append("<p class='project-desc-heading'>Description:</p>");
    $('.project-desc').append(project.description);
    $('.project-desc-panel').show();
}

function load_project(itemID) {
    gapi.client.ferris.project.get(
        {'itemId': itemID}
    ).execute( function (response) {
        populate_page(response);
    });
}

$(document).ready( function () {
    $('.search-button').addClass('navigate-to-home');
});
