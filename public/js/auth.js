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

var indexRef = database.ref('Index/');
var userRef = database.ref('Users/');
var userid;
//find the user id using email of this user

function getUserId(){
	indexRef.once('value', function(snapshot) {
	  snapshot.forEach(function(childSnapshot) {
	    var childKey = childSnapshot.key;
	    var childData = childSnapshot.val();
	    var currentUser = firebase.auth().currentUser;
	    console.log(childSnapshot);
	    // ...

	    if(childData==currentUser.email){
	    	console.log('FOUND!: ', currentUser.email,childKey);
	    	console.log('SHOWDATA: current user: ',childKey);
	    	userid = childKey;
	    	showUserData(childKey);
	    }
	  });
	  console.log('NOT FOUND!: ');
	});
}

// ============ end database =======

function showUserData(userID){
	userid = userID;
	console.log('showuserdata userid: '+userid);
	var userRef = database.ref('Users/'+userid+'/conversation/');

	//read and listen, run if change
	userRef.once('value', function(snapshot) {
		console.log('snapshot.key: '+snapshot.key);
		//for each conversation
		snapshot.forEach(function(childSnapshot){
			console.log('conversation number: ',childSnapshot.key);
			console.log(typeof childSnapshot);
			console.log(childSnapshot);

			var emotions = childSnapshot.child('emotions');
			emotions.forEach(function(perEmotion){
				var newDiv = document.createElement("div"); 

				newDiv.classList.add("one");
				var tempData = perEmotion.dimension.val() + ": " +perEmotion.score.val();
				console.log("tempData: "+ tempData);
				newDiv.innerHTML = tempData;

				document.querySelector('#emotionWrapper').appendChild(newDiv);
			});

			// var emotion1a = childSnapshot.child('emotions/0/dimension');
			// var emotion1b = childSnapshot.child('emotions/0/score');


			// console.log('emotion1a: '+emotion1a.val());
			// console.log('emotion1b: '+emotion1b.val());
			
			// var box = document.querySelector("#emotion1");
			// box.innerHTML = emotion1a.val() + ": " + emotion1b.val();

			// //UI CHANGES
			// var newDiv1 = document.createElement("div"); 

			// newDiv1.classList.add("one");

			
			// // and give it some content 
			// var newContent = document.createTextNode(emotion1a+' score: '+emotion1b); 
			// newDiv1.appendChild(newContent); 
			// var currentDiv = document.querySelector('#emotionWrapper');
			// document.body.insertBefore(newDiv1, currentDiv);
		})
		
	});
}r



function checkIfLoggedIn(){

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	  	
	    // User is signed in.
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    // ...

	    console.log('u r currently signed in as: ', email);
	    getUserId();
	    
	    
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





