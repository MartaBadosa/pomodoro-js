const timerDisplay = document.querySelector("#time-left");
const buttons = document.querySelectorAll("[data-time]");
const submitForm = document.querySelector("#custom-time");
const counter = document.querySelector("#counter");

//Sound
const endSound = document.querySelector("#end-sound");
endSound.volume = 0.2;


let countdown;
var clicked;
var pomodoro = 0;

function timer(seconds) {
  // Clear existing timers
  clearInterval(countdown);

  const now = Date.now() / 1000; // Also: new Date().getTime();
  const then = now + seconds;

  displayTime(seconds)

  // Update de count down every second
  countdown = setInterval(() => {
    // Difference between then and now (in seconds)
    const secondsLeft = Math.round(then - (Date.now() / 1000));

    // Stop the count down when the time is up
    if(secondsLeft < 0) {
      clearInterval(countdown);
      if (clicked === "25") {
        pomodoro++;
        counter.innerHTML = pomodoro;
      }
      return;
    }
    displayTime(secondsLeft);
  }, 1000);
}

function displayTime(seconds) {
  var hours, mins, secs;
  var display;

  // Calculate hours, mins, secs
  if(seconds > 3600) {
    hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    mins = Math.floor(seconds / 60);
    secs = seconds % 60;
    display = `${hours}:${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  } else {
    mins = Math.floor(seconds / 60);
    secs = seconds % 60;
    display = `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }
  timerDisplay.textContent = display;

  // Change the tab:
  if(seconds <= 0) {
    document.title = "STOP!";
    // Play end-sound
    endSound.play();
  } else {
    document.title = display + " - POMODORO TIMER";
  }
}

function startTimer(button) {
  const seconds = parseInt(button.dataset.time) * 60;
  timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", () => {
  startTimer(button);
  clicked = button.dataset.time;
}));

submitForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  timer(minutes * 60);
  this.reset();
});
