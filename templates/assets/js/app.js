var auth = firebase.auth();

function login(email, password){
    auth.signInWithEmailAndPassword(email, password).
    then(function(){
        window.location.assign("product-list.html");
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
    });
}

function signUp(email, password){
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
    });
}

function signOut(){
    auth.signOut().then(function() {
        // Sign-out successful.
        window.location.assign('log-in.html');
      }).catch(function(error) {
        // An error happened.
    });
}

auth.onAuthStateChanged(function(user){
    //console.log(user.email);
    if(user){
        
        $("#auth").show('fast');
        $("#unauth").hide('fast');
        $("#profileName").text((user.email).substr(0,6).toLowerCase() + '...')
    }
    else{
        
        $("#auth").hide('fast');
        $("#unauth").show('fast');
    }
});

$("form").on('submit', function(e){
    e.preventDefault();
    var email = $(this)[0].elements[0].value;
    var password = $(this)[0].elements[1].value;

    console.log($(this)[0].id);

    if($(this)[0].id === 'logIn'){
        login(email, password);
    }
    else{
        signUp(email, password);
    }
});

$("#signOut").on('click', function(){
    signOut();
});