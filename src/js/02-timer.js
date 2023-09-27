import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

let userDate = null;
let isActive; 

function onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
        Notiflix.Notify.Failure('Please choose a date in the future');
    } else {
        if (!isActive) {
            userDate = selectedDates[0];
            isActive = false;
            startBtn.disabled = false;
        }
    }
}

const options = {
  enableTime: true,       
  time_24hr: true,         
  defaultDate: new Date(), 
  minuteIncrement: 1,        
 onClose: onClose,          
};

const datetimePicker = flatpickr("#datetime-picker", options);

function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); 
console.log(convertMs(140000));
console.log(convertMs(24140000)); 

const startBtn = document.querySelector('button[data-start]');

startBtn.addEventListener('click', onClickStart);

function onClickStart() {
    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const result = userDate - currentTime;
        const { days, hours, minutes, seconds } = convertMs(result);
      document.querySelector('[data-days]').textContent = addLeadingZero(days); 
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);

        console.log(result);
        if (result < 1000) {
            clearInterval(intervalId);
        }
        timeTemplate(convertMs(result)); 
    }, 1000);
}

function timeTemplate({ days, hours, minutes, seconds, }) {
    return `${addLeadingZero(days)}:${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}
