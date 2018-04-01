var database = firebase.database();
var moodsRef = database.ref('moods/');

console.log(database.ref('moods/1522581819619/'));

function translate(UNIX_timestamp){
	console.log(typeof UNIX_timestamp);
	var a = new Date(parseInt(UNIX_timestamp));
	console.log(a.getMonth());
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  // var yr = "20"+ year.substr(2,3);
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var time = year + '/' + month + '/' + date;
	  return time;
}





function getDailyEmotions(obj){
	var returnArray = []
	var found = false;
	console.log('time to run');

	return moodsRef.once('value').then(snapshot => {
		snapshot.forEach(function(childSnap){
			var arr = []
			console.log("translating: "+childSnap.key+' '+translate(childSnap.key));
			//when found
			if(obj.reqTime==translate(childSnap.key)){
				found = true;
				console.log('yes!');
				var moodRef = childSnap.child('mood/');

				moodRef.forEach(function(childMood){
					obj.result.push(childMood.val());
					console.log(obj.result);
				});

				console.log("second test" + obj.result);
				return obj;
			}
		});
	});
};

var obj = {"reqTime" : "50218/Sep/12","result" : []}
getDailyEmotions(obj).then(snapshot => {console.log("real",obj.result)})