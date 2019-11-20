//Timing for messages
var noon = 12;
var evening = 18; // 6PM
//timed events
var wakeupTime = 9; // 9AM
var lunchTime = 12; // 12PM
var napTime = lunchTime + 2; // 2PM
var breakTime = false;
var workTime = false;
//measures of time
var tminutes = 0;
var tseconds = 0;
var displaytime = 0;
var timeLeft = 0;
var oneSecond = 1000;
var oneMinute = 60000;

//Links to the button and the selectors
var button = document.getElementById("partyTimeButton");
var wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector");
var lunchTimeSelector = document.getElementById("lunchTimeSelector");
var napTimeSelector = document.getElementById("napTimeSelector");

//Fetching the time
var time = new Date().getHours();

//updating the messages that appear and the images
var updateClock = function() {
//Fetching image from html and setting holder image
var image = "img/trees.jpg";
var imageSelector = document.getElementById('image-slider');

//Linking messages to HTML
var messageText;
var message = document.getElementById('timeEvent');

if (time == breakTime){
	image = "img/waves.jpg";
    messageText = "Take 10";
} else if (time == napTime) {
	image = "img/catnap.jpg";
    messageText = "It's time to take a nap...";
} else if (time == lunchTime) {
	image = "img/food.jpg";
    messageText = "It's time to eat";
} else if (time == wakeupTime) {
	image = "img/wakeup.jpg";
    messageText = "It's time to work.";
} else if (time < noon) {
    messageText = "Good morning";
		image = "img/wakeup.jpg";
} else if (time > evening) {
    messageText = "Good evening";
		image = "img/forest.jpg";
} else {
    messageText = "Good afternoon";
		image = "img/trees.jpg";
}

//Puts message into HTML
message.innerText= messageText;
imageSelector.src = image;

	showCurrentTime();
};

//Clock function
var showCurrentTime = function() {
// display the string on the webpage
var clock = document.getElementById('clock');

var currentTime = new Date();

var hours = currentTime.getHours();
var minutes = currentTime.getMinutes();
var seconds = currentTime.getSeconds();
var meridian = "AM";

// Set hours
if (hours >= noon) {
     meridian = "PM";
}
    if (hours > noon) {
    hours = hours - 12;
}
// Set Minutes
    if (minutes < 10) {
        minutes = "0" + minutes;
}
// Set Seconds
    if (seconds < 10) {
        seconds = "0" + seconds;
}
// put together the string that displays the time
var clockTime = hours + ":" + minutes + ":" + seconds + " " + meridian;

clock.innerText = clockTime;
};

showCurrentTime();
updateClock();
setInterval (updateClock, oneSecond);


//countdown function that decrements the timeLeft on the timer
var tick = function(timeref) {

  var timeleft = timeref[0]; //position 0 in array
  if ( timeleft <= 0 ) {
    clearInterval(timeref[1]);
  }
	//if it's more than 0 then the decrement takes place and the value is stored
  	console.log(timeleft);
  	timeref[0] -= 1000;
};

//variables used in the tick function
var count = 1000;
var countdown; //empty variable
countdown = [ count ]; //stores as an array
countdown[1] = setInterval(tick, count, countdown); //passes conditions and keeps note of the number of times the loop has occured


/*tminutes = parseInt(i / oneMinute, 10);
tseconds = parseInt(i % oneMinute);

tminutes = tminutes < 10 ? "0" + tminutes : tminutes;
tseconds = tseconds/1000;
tseconds = tseconds < 10 ? "0" + tseconds : tseconds;

displaytime = tminutes + ":" + tseconds;/*

/*var workEvent = function () {

	if (workTime === false) {
		workTime = true;
		time = workTime;

	let displaytime = 0;
	let timeleft = 15000;

//var countdown = setInterval(function() {
	var tminutes = parseInt(timeleft / 600, 10);
	var tseconds = parseInt(timeleft % 60, 10);

	tminutes = tminutes < 10 ? "0" + tminutes : tminutes;
	tseconds = tseconds < 10 ? "0" + tseconds : tseconds;

	displaytime = tminutes + ":" + tseconds;

	document.getElementById("workTimer").innerText = displaytime;

	if (timeleft <= 0){
		clearInterval(workEvent);
		document.getElementById("worktimer").innerText = "00:00";
}
else {
	clearInterval(workEvent);
	document.getElementById("workTimer").innerText = "00:00";
}
}, oneSecond);
}
};*\

workTimeButton.addEventListener("click", workEvent);
/*
//function for when the button is off or on
var breakEvent = function () {
	if (breakTime === false) {
		breakTime = true;
		time = breakTime;

		//countdown function for the break
		let timeleft  = 900;
		let displaytime = 0;

		var timercount = setInterval(function(){

		var tminutes = parseInt(timeleft / 600, 10);
		var tseconds = parseInt(timeleft % 60, 10);
		tminutes = tminutes < 10 ? "0" + tminutes : tminutes;
		tseconds = tseconds < 10 ? "0" + tseconds : tseconds;

		displaytime = tminutes + ":" + tseconds;

		document.getElementById("breakTimer").innerText = displaytime;
			 timeleft -=1;
			 if (timeleft <= 0){
			   clearInterval(breakEvent);
				 document.getElementById("breakTimer").innerText = "00:00";
			 }
		}, oneSecond);

		breakTimeButton.innerText = "Come back in 10";
    breakTimeButton.style.backgroundColor ="#222";
	}
	else {
		breakTime = false;
			clearInterval(breakTimer);
			document.getElementById("breakTimer").innerText = "00:00";
		}

		breakTimeButton.innerText= "I need a longer break";
		breakTimeButton.style.backgroundColor ="#0A8DAB";
	};*/

//functions for changing the image and message shown
var wakeupEvent = function (){
	wakeupTime = wakeUpTimeSelector.value;
};
var naptimeEvent = function(){
	napTime = napTimeSelector.value;
};
var lunchtimeEvent = function(){
	lunchTime = lunchTimeSelector.value;
};

//Button events
//breakTimeButton.addEventListener('click', breakEvent);
wakeUpTimeSelector.addEventListener('change', wakeupEvent);
napTimeSelector.addEventListener('change', naptimeEvent);
lunchTimeSelector.addEventListener('change', lunchtimeEvent);
