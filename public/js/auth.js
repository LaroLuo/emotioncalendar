var signinButton = document.querySelector('#signinButton');
var signoutButton = document.querySelector('#signoutButton');

var displayname = document.querySelector("#google-displayname");
var displayPic = document.querySelector("#google-pic");

signinButton.addEventListener("click", function(){
	signInWithGoogle();
});

signoutButton.addEventListener("click", function(){
	signOut();
});

window.onload = function(){
	checkIfLoggedIn();
}


// ============ database setup ========
var database = firebase.database();

var indexRef = database.ref('/Index');
var userRef = database.ref('/Users');

//find the user id using email of this user

function getUserId(){
	ref.once('value', function(snapshot) {
	  snapshot.forEach(function(childSnapshot) {
	    var childKey = childSnapshot.key;
	    var childData = childSnapshot.val();
	    console.log(childSnapshot);
	    var currentUser = firebase.auth().currentUser;
	    // ...


	    if(childData==currentUser.email){
	    	console.log('FOUND!');
	    	return childKey;
	    }
	  });
	  return "0000";
	});
}

// ============ yes database =======

function checkIfLoggedIn(){

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	  	console.log('u r currently signed in');
	    // User is signed in.
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    // ...

	    //get userID
	    var currentUserId = getUserId();
	    console.log('horay!~ you found the user ID and returned in session: ', currentUserId);

	    signinButton.setAttribute('style', 'display: inline-block; visibility: hidden;');
	    signoutButton.setAttribute('style', 'display: inline-block; visibility: visible;');

	    displayPic.src = photoURL;
	    displayname.innerHTML = displayName; 


	  } else {
	  	console.log('you are currently signed out');
	    // User is signed out.
	    // ...
	    displayPic.src = '';
	    displayname.innerHTML = '' ; 
	    signinButton.setAttribute('style', 'display: inline-block; visibility: visible;');
	    signoutButton.setAttribute('style', 'display: inline-block; visibility: hidden;');
	  }
	});
}

function signInWithGoogle(){

	alert('test');
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');

	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // ...
	  checkIfLoggedIn();

	}).catch(function(error) {
		console.log(error);
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
}

function signOut(){
	firebase.auth().signOut();

	checkIfLoggedIn();
}





