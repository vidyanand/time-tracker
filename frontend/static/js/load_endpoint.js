var  CLIENT_ID = '858743601957-ahhhp3ip39c6fj1jucu5t1ga3k7e7s4d.apps.googleusercontent.com';
var SCOPES = ['email'];

function google_signin(background){
    gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: background
    }, function(result){
        if(!result.error) {
            $('.google-login-button').hide();
            gapi.client.load('ferris', 'v1', function() {
                on_ferris_loaded();
            }, ROOT);
        }
        else {
            $(".not-signed-in-alert").show();
        }
    });
}

function on_gapi_loaded(){
    gapi.client.load('oauth2', 'v2', function(){
        google_signin(true);
    });
}

