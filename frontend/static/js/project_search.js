$(".search-button").click( function () {
    var searchText = $(".search-text").val();

    gapi.client.ferris.project.search(
        {'search_by': searchText}
    ).execute( function(response) {
        $('.project-individual-container').remove();

        response.items.forEach(function(item){
            $('.projects-nav-button-forward').before($(make_project_html(item)));
        });

        $('.projects-nav-button-forward').hide();
        $('.projects-nav-button-backward').hide();
    });
});
