const screen = document.querySelector('#timer-input');
const btns = document.querySelectorAll('.clock-input');
const pauseBtn = document.querySelector('#pause');
const addBtns = document.querySelectorAll('.time-button');
const restartBtn = document.querySelector('#restart');
const stopBtn = document.querySelector('#stop');

const timeUp = document.querySelector('#study-up');
const timeDown = document.querySelector('#study-down');
const timeScreen = document.querySelector('#study-input');
const breakUp = document.querySelector('#break-up');
const breakDown = document.querySelector('#break-down');
const breakScreen = document.querySelector('#break-input');

const MIN = 60;
const HOUR = 3600;

var pomoTime = 25;
var breakTime = 5;

var sec = pomoTime * MIN;

var intervalID = 0;
var pause = false;
var pomo = true;
var stopped = true;

//--------------------------------------------Top Buttons--------------------------------------------

addBtns.forEach((button) => {
   button.addEventListener('mouseover', (e) => {
      button.style.opacity = "0.6";
   });
   button.addEventListener('mouseout', (e) => {
      button.style.opacity = "1.0";
   });
   button.addEventListener('mousedown', (e) => {
      button.style.opacity = "0.4";
   });
   button.addEventListener('mouseup', (e) => {
      button.style.opacity = "0.6";
   });
});

timeUp.addEventListener('click', function() {
   pomoTime+=1;
   timeScreen.value = pomoTime;
   if (pomo && stopped) {
      sec = pomoTime * MIN;
      display();
   }
});
timeDown.addEventListener('click', function() {
   pomoTime-=1;
   timeScreen.value = pomoTime;
   if (pomo && stopped) {
      sec = pomoTime * MIN;
      display();
   }
});

breakUp.addEventListener('click', function() {
   breakTime+=1;
   breakScreen.value = breakTime;
   if (!pomo && stopped) {
      sec = breakTime * MIN;
      display();
   }
});
breakDown.addEventListener('click', function() {
   breakTime-=1;
   breakScreen.value = breakTime;
   if (!pomo && stopped) {
      sec = breakTime * MIN;
      display();
   }
});

//-------------------------------------------Timer Buttons-------------------------------------------
btns.forEach((button) => {
   button.addEventListener('mouseover', (e) => {
      button.style.opacity = "0.6";
   });
   button.addEventListener('mouseout', (e) => {
      button.style.opacity = "1.0";
   });
   button.addEventListener('mousedown', (e) => {
      button.style.opacity = "0.4";
   });
   button.addEventListener('mouseup', (e) => {
      button.style.opacity = "0.6";
   });
});

pauseBtn.addEventListener('click', playPause);

stopBtn.addEventListener('click', function() {resetTime(pomoTime); stopped = true;});

restartBtn.addEventListener('click', function() {
   pomoTime = 25;
   breakTime = 5;
   timeScreen.value = pomoTime;
   breakScreen.value = breakTime;
   resetTime(pomoTime);
   stopped = true;
});

function resetTime(time) {
   clearInterval(intervalID);
   sec = time * MIN;
   pause = false;
   pomo = true;
   display();
   timeScreen.style.backgroundColor = "rgba(200, 255, 200, 0.5)";
   breakScreen.style.backgroundColor = "rgba(200, 255, 200, 0.5)";
}

function playPause() {
   if (pause)
      clearInterval(intervalID)
   else
      intervalID = setInterval(decrement, 1000);
      
   stopped = false;
   pause = !pause;
}

function decrement() {
   if (sec > 0) {
      sec -= 1;
   }
   else {
      pomo = !pomo;
      sec = pomo ? pomoTime : breakTime;
      sec *= MIN;
   }
   
   if (pomo) {
      timeScreen.style.backgroundColor = "rgba(200, 150, 150, 1.0)";
      breakScreen.style.backgroundColor = "rgba(200, 255, 200, 0.5)";
   }
   else {
      timeScreen.style.backgroundColor = "rgba(200, 255, 200, 0.5)";
      breakScreen.style.backgroundColor = "rgba(200, 150, 150, 1.0)";
   }
   display();
}

function display() {
   screen.value = '';
   var hours = parseInt(sec / HOUR);
   var mins = parseInt(sec / MIN) - MIN * hours;
   
   if (hours > 0)
      screen.value += pad(hours) + ':';

   screen.value += pad(mins) + ':';
   screen.value += pad(sec % MIN);
}

function pad(val) {
   if (val < 10)
      return '0' + val;
   return val;
}

window.addEventListener("keypress", readKey);

function readKey(e) {
   switch(e.which) {
      // Spacebar
      case 32:
         playPause();
         break;
      // Left
      case 37:
         break
      // Up
      case 38:
         break
      // Right
      case 39:
         break
      // Down
      case 40:
         break
      /* 
      case 48:
         return setDisp('0');
      case 49:
         return setDisp('1');
      case 50:
         return setDisp('2');
      case 51:
         return setDisp('3');
      case 52:
         return setDisp('4');
      case 53:
         return setDisp('5');
      case 54:
         return setDisp('6');
      case 55:
         return setDisp('7');
      case 56:
         return setDisp('8');
      case 57:
         return setDisp('9');
      */
   }
};
