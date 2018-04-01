var month = getMonth();
var day = getDay();
var daySuffix = getDaySuffix();
document.getElementById("da").innerHTML += month + " " + day + daySuffix;
startTime();
// anger joy fear sadness surprise
var emotion = "sadness"; // change to get actual emotion later
var emotionPicUrl = getURLBy(emotion);
updateEmotionPic(emotionPicUrl);
updateWelcome(emotion);
updateRecommend(emotion);

var shown = false;
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
	document.getElementById("ti").innerHTML = "";
	document.getElementById("da").innerHTML = getMonth(month) + " " + day.toString() + getDaySuffix(day);
	updateEmotionPic(emotion);
	updateRecommend(emotion);
}

var daysOffset = 0;

function prev() {
	daysOffset--;
	var then = new Date(Date.now() - daysOffset * 86400000);
	// var emotion = getEmotion(getArray(then.getMonth(), then.getDay()) );
	// update(then.getMonth(), then.getDay(), emotion);
}

function next() {
	daysOffset++;
	if (daysOffset == 0) {
		startTime();
	}

}