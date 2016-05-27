/* Web Client ID from the Google Developer Console */
var  CLIENT_ID = '104270230176-ssd2989mdj9f4ihecr4o5m3dsshuk5p6.apps.googleusercontent.com';
var SCOPES = ['email'];

/* This is called to signin the user using Google */
function google_signin(background){
    gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: background
    }, function(result){
        if(!result.error) {
            on_user_authed(result);
        }
    });
}

function google_signout(){
    gapi.auth.signOut();
    on_gauth_signout();
}
