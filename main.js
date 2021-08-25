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


// Register function
function register(){

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