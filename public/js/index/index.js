var month = getMonth();
var day = getDay();
var daySuffix = getDaySuffix();
var hours = getHours();
var minutes = getMinutes();
document.getElementById("ti").innerHTML += hours + " : " + minutes;
document.getElementById("da").innerHTML += month + " " + day + daySuffix;
startTime();