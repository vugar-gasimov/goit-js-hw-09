// Import necessary libraries and styles
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

// Select the start button and initialize variables
const startBtn = document.querySelector('button[data-start]');
let userDate = null;
let isActive = false;

// Disable the start button initially
startBtn.disabled = true;

// Function to handle date selection
function onClose(selectedDates) {
  if (selectedDates[0] < options.defaultDate) {
    // Show a failure notification if the selected date is in the past
    Notiflix.Notify.failure('Please choose a date in the future', {
      cssAnimationStyle: 'from-top',
      timeout: 5000,
    });
  } else {
    if (!isActive) {
      // Enable the start button if the selected date is in the future
      userDate = selectedDates[0];
      isActive = true;
      startBtn.disabled = false;
    }
  }
}

// Configuration options for the date picker
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onClose,
};

// Select the date input element and initialize the date picker
const input = document.querySelector('#datetime-picker');
flatpickr(input, options);

// Function to convert milliseconds to days, hours, minutes, and seconds
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

// Function to handle the start button click
const onClickStart = () => {
  // Get the selected date and current time
  const selectedDate = input._flatpickr.selectedDates[0];
  const currentTime = new Date();

  if (selectedDate < currentTime) {
    // Show a failure notification if the selected date is in the past
    Notiflix.Notify.failure('Please choose a date in the future', {
      cssAnimationStyle: 'from-top',
      timeout: 5000,
    });
    return; // Don't proceed with the countdown
  }

  // Disable input and start button, and show a "Countdown has started!" notification
  input.disabled = true;
  isActive = true;
  startBtn.disabled = true;
  Notiflix.Notify.info('Countdown has started!', {
    cssAnimationStyle: 'from-top',
    timeout: 5000,
  });

  // Start the countdown timer
  const intervalId = setInterval(() => {
    const result = selectedDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(result);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);

    if (result < 1000) {
      // Clear the interval and show a "Countdown has ended!" notification
      clearInterval(intervalId);
      isActive = false;
      startBtn.disabled = false;
      Notiflix.Notify.success('Countdown has ended!', {
        cssAnimationStyle: 'from-top',
        timeout: 5000,
      });
      resetTimer(); // Reset the timer when the countdown ends
    }
  }, 1000);
};

// Add a click event listener to the start button
startBtn.addEventListener('click', onClickStart);

// Function to add a leading zero to a value if it's less than 10
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Function to reset the timer values and enable input after countdown ends
function resetTimer() {
  document.querySelector('[data-days]').textContent = '00';
  document.querySelector('[data-hours]').textContent = '00';
  document.querySelector('[data-minutes]').textContent = '00';
  document.querySelector('[data-seconds]').textContent = '00';
  input.disabled = false;
  isActive = false;
}
