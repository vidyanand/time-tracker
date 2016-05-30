function searchProjects (searchBy) {
    gapi.client.ferris.project.search(
        {'search_by': searchBy}
    ).execute( function(response) {
        $('.project-individual-container').remove();

        response.items.forEach(function(item){
            $('.projects-nav-button-forward').before($(make_project_html(item)));
        });

        $('.projects-nav-button-forward').hide();
        $('.projects-nav-button-backward').hide();
    });
    page = 1;
}


$(".search-button").click( function () {
    var searchText = $(".search-text").val();

    if ($(this).hasClass('navigate-to-home')) {
        window.location.href = "/?search_str=" + searchText;
    }

    searchProjects(searchText);

    $(".search-text").val('');
});
