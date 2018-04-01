function getURLBy(emotion) {
	// anger joy fear sadness surprise
	switch (emotion) {
		case "anger": return "https://cdn.shopify.com/s/files/1/1061/1924/products/Angry_Emoji_large.png?v=1480481051";
		case "joy": return "https://cdn.shopify.com/s/files/1/1061/1924/products/Smiling_Emoji_with_Eyes_Opened_large.png?v=1480481056";
		case "fear": return "http://cdn.shopify.com/s/files/1/1061/1924/products/Fearful_Face_Emoji_grande.png?v=1480481053";
		case "sadness": return "http://idighardware.com/wp-content/uploads/2017/09/Crying-Emoji.png";
		case "surprise": return "https://annelunedotcom.files.wordpress.com/2017/12/omg_emoji_icon1.png?w=288";
		default: return "error";
	}
}

function updateEmotionPic(url) {
	document.getElementById("emPic").src = url;
} 

function updateWelcome(emotion) {
	//document.getElementById("username").innerHTML = username;
	switch (emotion) {
		case "anger": emotion = "angry"; break;
		case "joy": emotion = "happy"; break;
		case "fear": emotion = "scared"; break;
		case "sadness": emotion = "sad"; break;
		case "surprise": emotion = "surprised"; break;
	}

	document.getElementById("emotionStr").innerHTML = emotion;
}

function updateRecommend(emotion) {
	var recommendations = getRecommendationBasedOn(emotion);
	recommendations = recommendations.split(";");
	document.getElementById("tf1").innerHTML = " - " + recommendations[0];
	document.getElementById("tf2").innerHTML = " - " + recommendations[1];
}

function getRecommendationBasedOn(emotion) {
	switch (emotion) {
		case "anger": return getAngerRecommend();
		case "joy": return getHappyRecommend();
		case "fear": return getFearRecommend();
		case "sadness": return getSadnessRecommend();
		case "surprise": return getSurpriseRecommend();
		default: return "error;error";
	}
}

function getAngerRecommend() {
	var angryRecoms = [
		"Read a book",
		"Go jogging for a mile",
		"Phone a friend",
		"Go hiking",
		"Watch some funny videos on Youtube"
	];
	var rec1 = angerRecom[Math.floor(Math.random() * angryRecoms.length)];
	var rec2 = rec1;
	while (rec1 == rec2) {
		rec2 = angerRecom[Math.floor(Math.random() * angryRecoms.length)];
	}
	return rec1 + ";" + rec2;
}

function getHappyRecommend() {
	var happyRecom = [
		"Take a walk outside",
		"Reach out to a friend",
		"Answer a question on Quora",
		"Help a friend in need",
		"Help an absolute stranger",
		"Learn something new"
	];
	var rec1 = happyRecom[Math.floor(Math.random() * happyRecom.length)];
	var rec2 = rec1;
	while (rec1 == rec2) {
		rec2 = happyRecom[Math.floor(Math.random() * happyRecom.length)];
	}
	return rec1 + ";" + rec2;
}

function getFearRecommend() {
	var fearRecom = [
		"Go to bed before midnight",
		"Talk to a friend or relative",
		"Go for a walk",
		"Do some exercise"
	];
	var rec1 = fearRecom[Math.floor(Math.random() * fearRecom.length)];
	var rec2 = rec1;
	while (rec1 == rec2) {
		rec2 = fearRecom[Math.floor(Math.random() * fearRecom.length)];
	}
	return rec1 + ";" + rec2;
}

function getSadnessRecommend() {
	var sadnessRecom = [
		"Write down what happened",
		"Tell what you feel to a friend",
		"Work out",
		"Let it out. Find an isolated place to cry until you feel better",
		"Have something you love for dinner"
	];
	var rec1 = sadnessRecom[Math.floor(Math.random() * sadnessRecom.length)];
	var rec2 = rec1;
	while (rec1 == rec2) {
		rec2 = sadnessRecom[Math.floor(Math.random() * sadnessRecom.length)];
	}
	return rec1 + ";" + rec2;
}

function getSurpriseRecommend() {
	var surpriseRecom = [
		"Share your surprise with others",
		"Write what happened down so that you will remember it later"
	];
	var rec1 = surpriseRecom[Math.floor(Math.random() * surpriseRecom.length)];
	var rec2 = rec1;
	while (rec1 == rec2) {
		rec2 = surpriseRecom[Math.floor(Math.random() * surpriseRecom.length)];
	}
	return rec1 + ";" + rec2; 
}

function getEmotion(arr) {
	var i = arr.indexOf(Math.max(...arr));
	switch (i) {
		case 0: return "anger";
		case 1: return "joy";
		case 2: return "fear";
		case 3: return "sadness";
		case 4: return "surprise";
	}
}