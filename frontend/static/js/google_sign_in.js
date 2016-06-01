/* Web Client ID from the Google Developer Console */
var  CLIENT_ID = '858743601957-ahhhp3ip39c6fj1jucu5t1ga3k7e7s4d.apps.googleusercontent.com';
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

// function google_signout(){
//     gapi.auth.signOut();
//     on_gauth_signout();
// }
