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
var nameReg = document.registerForm.name; // name feild in register form
var emailReg = document.registerForm.email; // email feild in register form
var passReg = document.registerForm.password; // password feild in register form
var emailLog = document.loginFrom.email; // email feild in login form
var passLog = document.loginForm.password; // password feild in register form


// password and email validation functions
function passValidate(password){
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(password == null || password == ""){
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
    if(email == null || email == ""){
        alert("Email feild cannot be empty");
        return false;
    }else{
        return true;
    }
}

function nameValidate(name){
    if(name == null || name == ""){
        alert("Name feild cannot be empty");
        return false;
    }
    else{
        return true;
    }
}



// Register function
function register(){

    if(passValidate(passReg.value) && emailValidate(emailReg.value) && nameValidate(nameReg.value)){
        auth.createUserWithEmailAndPassword(emailReg.value , passReg.value)
        .then( function(User){

            firebase.database().ref('users/' + User.user.uid).set({
                name: nameReg.value,
                email: emailReg.value
            })

            window.location.href = "../login/login.html";
            
        }).catch(
            function(error){
                alert(error.message);
            }
        )
    }    
}

// Login initialisation
function login(){
    auth.signInWithEmailAndPassword(emailLog.value , passLog.value)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        dashbaord(user.uid);
        // ...
    })
    .catch((error) => {
      alert(error.message)
    });
}


// Dashboard function
function dashbaord(useruid){
    window.location.href = "../login/login.html";

    firebase.database().ref('users/' + useruid).on('value', (snapshot) => {
        const data = snapshot.val();
        // updateStarCount(postElement, data);
        document.getElementById("name").innerHTML = data.name
        document.getElementById("email").innerHTML = data.email
      }
    );
}