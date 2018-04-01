var month = getMonth();
var day = getDay();
var daySuffix = getDaySuffix();
document.getElementById("da").innerHTML += month + " " + day + daySuffix;
startTime();
// anger joy fear sadness surprise
var shown = false;
var daysOffset = 0;
var daysCorrection = 0;

var substr = "";
if (day < 10) {
	substr = "0";
}

var obj = {"reqTime" : "2018/" + month + "/" + day,"result" : []}
getDailyEmotions(obj).then(snapshot => {
	console.log("real", obj.result);
	updateUI(obj);
})

// updateUI

function updateUI(obj){
	var emotion = getEmotion(obj.result); // change to get actual emotion later
	if (emotion != "none") {
		var emotionPicUrl = getURLBy(emotion);
		updateEmotionPic(emotionPicUrl);
		updateWelcome(emotion);
		updateRecommend(emotion);
	}
	else {
		document.getElementById("welcome").innerHTML = "<h2 id='welcomeFont'>No emotion recorded yet on this day.</h2>";
		document.getElementById("tf1").innerHTML = " - No Recommendations";
		document.getElementById("tf2").innerHTML = " - No Recommendations";
	}
}


var array;

// function getDailyEmotions(reqTime){
// 	var returnArray =[];
// 	console.log('time to run');
// 	console.log(typeof callback);

// 	return moodsRef.once('value', function(snapshot){
// 		snapshot.forEach(function(childSnap){
// 			console.log("translating: "+translate(childSnap.key));
// 			//when found
// 			if(reqTime==translate(childSnap.key)){
// 				console.log('yes!');
// 				var moodRef = childSnap.child('mood/');

// 				moodRef.forEach(function(childMood){
// 					returnArray.push(childMood.val());
// 					console.log(childMood.val());
// 				});
// 				alert("mmm");
// 			}
// 		})
// 	})
// };

function showRecommend() {
	if (shown) {
		hideRecommend();
	}
	else {
		document.getElementById("tasks").style.top = "75vh";
		document.getElementById("recommend").style.display = "block";
	}
	shown = !shown;
	
}

function hideRecommend() {
	document.getElementById("tasks").style.top = "85vh";
	document.getElementById("recommend").style.display = "none";
}

function update(month, day, emotion) {
	document.getElementById("da").innerHTML = getMonthBy(month) + " " + day.toString() + getDaySuffix(day);
	updateEmotionPic(emotion);
	updateRecommend(emotion);
}

function prev() {
	daysOffset--;
	var date_test = new Date();
	date_test.setDate(date_test.getDate() + daysOffset);
	obj = {"reqTime" : "2018/" + getMonthBy(date_test.getMonth() + 1) + "/" + date_test.getDate(),"result" : []};
	// update(then.getMonth(), then.getDay(), emotion);
	getDailyEmotions(obj).then(snapshot => {
		console.log("real", obj.result);
		var emotion = getEmotion(obj.result);
		if (emotion == "none") {
			document.getElementById("emotionStr").innerHTML = " not recording your emotion ";
		}
		if (daysOffset == 0) {
			document.getElementById("ti").style.display = "block";
			document.getElementById("tommorrow").style.display = "none";
		}
		else {
			document.getElementById("ti").style.display = "none";
			document.getElementById("tommorrow").style.display = "block";
		}
		document.getElementById("ti").style.display = "none";
		document.getElementById("da").innerHTML = getMonthBy(date_test.getMonth() + 1) + " " + date_test.getDate() + getDaySuffix(date_test.getDate());
		updateEmotionPic(getURLBy(emotion));
		updateRecommend(emotion);
		updateWelcome(emotion);
	});
	
}


function next() {
	daysOffset++;
	var date_test = new Date();
	date_test.setDate(date_test.getDate() + daysOffset);
	obj = {"reqTime" : "2018/" + getMonthBy(date_test.getMonth() + 1) + "/" + date_test.getDate(),"result" : []};
	// update(then.getMonth(), then.getDay(), emotion);
	getDailyEmotions(obj).then(snapshot => {
		console.log("real", obj.result);
		var emotion = getEmotion(obj.result);
		if (emotion == "none") {
			document.getElementById("emotionStr").innerHTML = " not recording your emotion ";
		}
		if (daysOffset == 0) {
			document.getElementById("ti").style.display = "block";
			document.getElementById("tommorrow").style.display = "none";
		}
		else {
			document.getElementById("ti").style.display = "none";
			document.getElementById("tommorrow").style.display = "block";
		}
		document.getElementById("ti").style.display = "none";
		document.getElementById("da").innerHTML = getMonthBy(date_test.getMonth() + 1) + " " + date_test.getDate() + getDaySuffix(date_test.getDate());
		updateEmotionPic(getURLBy(emotion));
		updateRecommend(emotion);
		updateWelcome(emotion);
	});
}