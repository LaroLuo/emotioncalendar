function getMonth() {
	var date = new Date();
	var month = date.getMonth();
	++month; // since getMonth() is between 0 - 11
	switch (month) {
		case 1: month = "Jan"; break;
		case 2: month = "Feb"; break;
		case 3: month = "Mar"; break;
		case 4: month = "Apr"; break;
		case 5: month = "May"; break;
		case 6: month = "Jun"; break;
		case 7: month = "Jul"; break;
		case 8: month = "Aug"; break;
		case 9: month = "Sep"; break;
		case 10: month = "Oct"; break;
		case 11: month = "Nov"; break;
		case 12: month = "Dec"; break;
	}
	return month;
}

function getMonth(month) {
	switch (month) {
		case 1: month = "Jan"; break;
		case 2: month = "Feb"; break;
		case 3: month = "Mar"; break;
		case 4: month = "Apr"; break;
		case 5: month = "May"; break;
		case 6: month = "Jun"; break;
		case 7: month = "Jul"; break;
		case 8: month = "Aug"; break;
		case 9: month = "Sep"; break;
		case 10: month = "Oct"; break;
		case 11: month = "Nov"; break;
		case 12: month = "Dec"; break;
	}
	return month;
}

function getDay() {
	var date = new Date();
	var day = date.getDate();
	return day.toString();
}

function getDaySuffix() {
	var date = new Date();
	var day = date.getDate();
	var daySuffix = "";
	switch (day % 10) {
		case 1: daySuffix = "st"; break;
		case 2: daySuffix = "nd"; break;
		case 3: daySuffix = "rd"; break;
		default: daySuffix = "th"; break;
	}
	return daySuffix;
}

function getDaySuffix(day) {
	var daySuffix = "";
	switch (day % 10) {
		case 1: daySuffix = "st"; break;
		case 2: daySuffix = "nd"; break;
		case 3: daySuffix = "rd"; break;
		default: daySuffix = "th"; break;
	}
	return daySuffix;
}

function getHours() {
	var date = new Date();
	var hours = date.getHours();
	return hours.toString();
}

function getMinutes() {
	var date = new Date();
	var minutes = date.getMinutes();
	if (minutes < 10) 
		minutes = "0" + minutes.toString();
	return minutes;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("ti").innerHTML =
    h + " : " + m + " : " + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}