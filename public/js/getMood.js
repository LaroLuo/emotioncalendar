var database = firebase.database();
var moodsRef = database.ref('moods/');

console.log(database.ref('moods/1522581819619/'));

function translate(UNIX_timestamp){
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  // var yr = "20"+ year.substr(2,3);
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var time = year + '/' + month + '/' + date;
	  return time;
}

function getEmotion(reqTime){
	var returnArray =[];
	console.log('time to run');

	moodsRef.once('value', function(snapshot){
		snapshot.forEach(function(childSnap){
			console.log("translating: "+translate(childSnap.key));
			//when found
			if(reqTime==translate(childSnap.key)){
				console.log('yes!');
				var moodRef = childSnap.child('mood/');

				moodRef.forEach(function(childMood){
					returnArray.push(childMood.val());
					console.log(childMood.val());
				})
			}
		})
	})

	return returnArray;
};

console.log("haha: " + getEmotion("50218/Sep/12"));
