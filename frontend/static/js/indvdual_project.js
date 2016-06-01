function on_ferris_loaded() {
    load_project(itemID);
}

function on_user_authed() {
}

function on_gauth_signout() {
}

function populate_page(project) {
    var projectName = project.name;
    var projectDesc = project.description;

    $('.project-desc').empty();

    $('.project-name').html("Project: " + projectName);
    $('.project-desc').append("<p class='project-desc-heading'>Description:</p>");
    $('.project-desc').append(projectDesc);
    $('.project-desc-panel').show();

    $('.project-update-name').attr("placeholder", projectName);
    $('.project-update-desc').attr("placeholder", projectDesc);
    $('.update-project').show();

    $('.delete-project').show();
}

function load_project(itemID) {
    if (typeof gapi.client.ferris !== 'undefined') {
        gapi.client.ferris.project.get(
            {'itemId': itemID}
        ).execute( function (response) {
            if (!response.error) {
                populate_page(response);
            } else {
                if (response.error.code == 404) {
                    $(".invalid-project-message").show();
                } else {
                    console.log(response.error);
                }
            }
        });
    } else {
        $(".not-signed-in-alert").show();
    }
}

function deleteProject(projectID) {
    if (typeof gapi.client.ferris !== 'undefined') {
        gapi.client.ferris.project.delete(
            {'itemId': projectID}
        ).execute( function (response) {
            if (!response.error) {
                $(".delete-alert").hide();
                $(".project-details").hide();
                $(".delete-project-success-message").show();
            } else {
                console.log(response.error);
            }
        });
    } else {
        $(".not-signed-in-alert").show();
    }
}

function updateProject() {
    var projectName = $(".project-update-name").val();
    var projectDesc = $(".project-update-desc").val();

    if (typeof gapi.client.ferris !== 'undefined') {
        gapi.client.ferris.project.update(
            {'itemId': itemID,
             'name': projectName,
             'description': projectDesc}
        ).execute(function(response){
            if (!response.error) {
                load_project(itemID);
                $(".not-signed-in-alert").hide();
            } else {
                console.log(response.error);
            }
        });
    } else {
        $(".not-signed-in-alert").show();
    }

    $(".project-update-name").val('');
    $(".project-update-desc").val('');
}

$(document).ready( function () {
    $('.search-button').addClass('navigate-to-home');

    $('.delete-project').click( function () {
        $(".delete-alert").show();
    });

    $('.close-delete-alert').click( function () {
        $(".delete-alert").hide();
    });

    $('.delete-project-confirm').click( function () {
        deleteProject(itemID);
    });

    $('.back-home-after-delete').click( function () {
        window.location.href = '/';
    });

    $('.update-project-button').click( function () {
        updateProject();
    });
});
