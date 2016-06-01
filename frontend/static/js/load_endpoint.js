/* This is called when the Google API Client is initialized. We'll load our endpoint here */
function on_gapi_loaded(){
    /* First load the oauth library */
    gapi.client.load('oauth2', 'v2', function(){
        /* Try to do a background signin */
        google_signin(true);
    });

    /* Then load the endpoint library */
    gapi.client.load('ferris', 'v1', function() {
        on_ferris_loaded();
    }, ROOT);
}
