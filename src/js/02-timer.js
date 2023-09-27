import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


function onClose(selectedDates) {
  console.log(selectedDates[0]); // Log the selected date and time when the picker is closed
}

const options = {
  enableTime: true,          // Enable time selection
  time_24hr: true,           // Use 24-hour time format
  defaultDate: new Date(),   // Set the default date and time to the current date and time
  minuteIncrement: 1,        // Set the minute increment to 1
 onClose: onClose,          // Assign the callback function here
};

flatpickr("#datetime-picker", options);


startBtn = document.querySelector('button[data-start]');

class Timer {
    constructor() {
        this.intervalId = null;
        this.isActive = false;
        this.initTime = null;
    }
      
    start() {
        if (this.isActive)
            return;
        this.initTime = Date.now();
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const diff = currentTime - this.initTime;
            this.tick(diff);
        }, 100);
        this.isActive = true;
    }


    tick(milliseconds) {
        const time = this.parseTime(milliseconds);
        render(time);
    }

    parseTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return {
            hours: hours % 24,
            minutes: minutes % 60,
            seconds: seconds % 60,
            milliseconds: milliseconds % 1000,
        }
    }
}

const timer = new Timer();

refs.startBtn.addEventListener('click', () => {
    timer.start();
});

function render(time) {
    const markup = timeTemplate(time)
    refs.clockface.innerHTML = markup;
    console.log(timeTemplate(time));
}

function timeTemplate({ hours, minutes, seconds, milliseconds }) {
    return `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}.${milliseconds.toString().padStart(3,'0')}`;
}

function padStart(num) {
    return num.toString().padStart(2, '0');
}