// Web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB0tTu5dTNIQ2TJWiHxQB4JNCnVQmGw1mw",
    authDomain: "projecttechpunt.firebaseapp.com",
    databaseURL: "https://projecttechpunt-default-rtdb.firebaseio.com",
    projectId: "projecttechpunt",
    storageBucket: "projecttechpunt.appspot.com",
    messagingSenderId: "853098974382",
    appId: "1:853098974382:web:7ea2ee6820efb86c8bf13f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// variable intialisation
var auth = firebase.auth();


// password and email validation functions
function passValidate(password){
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(password == null){
        alert("Password feild cannot be empty");
        return false;
    }
    else if(password.length < 6){
        alert("Password cannot be less than 6 characters");
    }
    else if(password.match(passw)){
        return true;
    }
    else{
        alert("Password is too weak. Trying using atleast one number, smalls and capital characters");
        return false;
    }
}

function emailValidate(email){
    if(email == null){
        alert("Email feild cannot be empty");
        return false;
    }else{
        return true;
    }
}

function nameValidate(name){
    if(name == null){
        alert("Name feild cannot be empty");
        return false;
    }
    else{
        return true;
    }
}



// Register function
function register(){

    if(passValidate(document.getElementById("password").value) && emailValidate(document.getElementById("email").vlaue) && nameValidate(document.getElementById("name").vlaue)){
        auth.createUserWithEmailAndPassword(document.getElementById("email").value , document.getElementById("password").value)
        .then( function(User){

            firebase.database().ref('users/' + User.user.uid).set({
                name: document.getElementById("name").value,
                email: document.getElementById("email").value
            })
            
        }).catch(
            function(error){
                alert(error.message);
            }
        )
    }    
}

// Login initialisation
function login(){
    auth.signInWithEmailAndPassword(document.getElementById("email").value , document.getElementById("password").value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      // ...
    })
    .catch((error) => {
      alert(error.message)
    });
}