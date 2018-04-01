var database = firebase.database();


//find the user id using email of this user

// function getUserId(){
// 	ref.once('value', function(snapshot) {
// 	  snapshot.forEach(function(childSnapshot) {
// 	    var childKey = childSnapshot.key;
// 	    var childData = childSnapshot.val();
// 	    console.log(childSnapshot);
// 	    var currentUser = firebase.auth().currentUser;
// 	    // ...


// 	    if(childData==currentUser.email){
// 	    	console.log('FOUND!');
// 	    	return childKey;
// 	    }
// 	  });
// 	  return "0000";
// 	});
// }
	//if can find user
function userData(userID){
	var userid = userID;
	var userRef = database().ref('Users/'+userid+'/');

	//read and listen, run if change
	userRef.on('value', function(snapshot) {
		console.log('Getting user data: ',snapshot.key);
		console.log(typeof snapshot);
		console.log(snapshot);
		
		//UI CHANGES
		
	});
}

	// //read once
	// var indexRef = firebase.auth().currentUser.uid;
	// return userRef.once('value').then(function(snapshot) {
	//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
	//   // ...
	// });	



	//if cant find user

//show the user data using the userid