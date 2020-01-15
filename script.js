//Timing for messages
var noon = 12;
var evening = 18; // 6PM
//timed events
var wakeupTime = 9; // 9AM
var lunchTime = 12; // 12PM
var napTime = lunchTime + 2; // 2PM
var breakTime = false;
var workTime = false;
var resetStatus = false;
//measures of time
var oneSecond = 1000;
var oneMinute = 60000;
//message for restarting the timeref
var resetMessage = "Reset the timer to start again";


//Links to the button and the selectors
var button = document.getElementById("partyTimeButton");
var wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector");
var lunchTimeSelector = document.getElementById("lunchTimeSelector");
var napTimeSelector = document.getElementById("napTimeSelector");

//fetching the time
var time = new Date().getHours();

//updating the messages that appear and the images
var updateClock = function() {
//Fetching image from html and setting holder image
var image = "img/trees.jpg";
var imageSelector = document.getElementById('image-slider');
//Linking messages to HTML
var messageText;
var message = document.getElementById('timeEvent');
if (time == breakTime) {
			image = "img/waves.jpg";
    	messageText = "Take 5";
} 	else if (time == napTime) {
			image = "img/catnap.jpg";
    	messageText = "It's time to take a nap...";
} 	else if (time == lunchTime) {
			image = "img/food.jpg";
    	messageText = "It's time to eat";
} 	else if (time == wakeupTime) {
			image = "img/wakeup.jpg";
    	messageText = "It's time to work.";
} 	else if (time < noon) {
    	messageText = "Good morning";
			image = "img/wakeup.jpg";
} 	else if (time > evening) {
    	messageText = "Good evening";
			image = "img/forest.jpg";
} 	else {
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
setInterval(updateClock, oneSecond);

//countdown function that decrements a timer
var tick = function(timeref) {

  var timeleft = timeref[0]; //position 0 in array
  if ( timeleft <= 0 ) {
    clearInterval(timeref[1]);
  }
	var tminutes = parseInt(timeref[0] / oneMinute, 10);
	var tseconds = parseInt(timeref[0] % oneMinute);
	tminutes = tminutes < 10 ? "0" + tminutes : tminutes;
	tseconds = tseconds/oneSecond;
	tseconds = tseconds < 10 ? "0" + tseconds : tseconds;
	var displaytime = tminutes + ":" + tseconds;
	document.getElementById("workTimer").innerText = displaytime;
	timeref[0] -= 1000;
};

//variables used in the tick function and in the timing events
var countdown; //empty variable
var timeref; //empty varible

var workEvent = function() {
	 if (workTime == true){
		 	timerMessage.innerText = resetMessage;
	 } else if (workTime == false) {
		 	workTime = true;
			timeref = 1500000;
			countdown = [timeref];
			countdown[1] = setInterval(tick, oneSecond, countdown);
			breakTimeButton.removeEventListener('click', breakEvent);
	}
};

var breakEvent = function() {
	if (breakTime == true){
			timerMessage.innerText = resetMessage;
	}	else if (breakTime == false){
			breakTime = true;
			timeref = 300000;
			countdown = [timeref];
			countdown[1] = setInterval(tick, oneSecond, countdown);
			workTimeButton.removeEventListener('click', workEvent);
	}
};

var reset = function(){
	workTime = false;
	breakTime = false;
	clearInterval(countdown[1]);
	workTimer.innerText = "";
	timerMessage.innerText = "";
	breakTimeButton.addEventListener('click', breakEvent);
	workTimeButton.addEventListener('click', workEvent);
};

//functions for changing the image and updating the accompanying message
var wakeupEvent = function() {
	wakeupTime = wakeUpTimeSelector.value;
};
var naptimeEvent = function() {
	napTime = napTimeSelector.value;
};
var lunchtimeEvent = function() {
	lunchTime = lunchTimeSelector.value;
};

//Button events
wakeUpTimeSelector.addEventListener('change', wakeupEvent);
napTimeSelector.addEventListener('change', naptimeEvent);
lunchTimeSelector.addEventListener('change', lunchtimeEvent);
resetButton.addEventListener('click', reset);
breakTimeButton.addEventListener('click', breakEvent);
workTimeButton.addEventListener('click', workEvent);
