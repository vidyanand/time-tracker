/* Call the signin function when the signin button is clicked */
$('#googleSignInButton').on('click', function(e){
    google_signin();
});
$('#googleSignOutButton').on('click', function(e){
    google_signout();
});

/* This is called when the user successfully logs in via Google */
function on_user_authed() {
    /* Hide the anon button and show the authed button */
    $('#anonymousSubmit').hide();
    $('#authedSubmit').show();
}

function on_gauth_signout() {
    $('#authedSubmit').hide();
    $('#anonymousSubmit').show();
}

/* This is called after the endpoint has successfully loaded. We'll load our guestbook posts here. */
function on_ferris_loaded() {
    load_posts();
}

/* This calls the endpoints and inserts our list of posts into the page */
function load_posts(){
    gapi.client.ferris.guestbook.list().execute(function(r){
        r.items.forEach(function(item){
            $('#postsContainer').append($(make_post_html(item)));
        });
    });
}

/* This creates the html template for a given post */
function make_post_html(item){
    return '<div>' +
        (!item.author ? 'An anonymous person wrote' : '<b>' + item.author.nickname + '</b> wrote:') +
        '<blockquote>' + item.content + '</blockquote>' +
        '</div>';
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
