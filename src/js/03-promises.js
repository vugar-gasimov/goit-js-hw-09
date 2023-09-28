// Import the Notiflix library for displaying notifications
import Notiflix from 'notiflix';

// Select form elements from the HTML
const formEl = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const submit = document.querySelector('button[type="submit"]');

// Function to create a promise with a random resolve/reject outcome after a delay
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    // Generate a random boolean to determine if the promise should resolve or reject
    const shouldResolve = Math.random() > 0.3;
    
    // Use setTimeout to simulate an asynchronous task
    setTimeout(() => {
      if (shouldResolve) {
        // Resolve the promise with an object containing position and delay
        resolve({ position, delay });
      } else {
        // Reject the promise with the same object
        reject({ position, delay });
      }
    }, delay);
  });
}

// Add a submit event listener to the form
formEl.addEventListener('submit', onclick);

// Function to handle form submission
function onclick(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Extract values from form inputs and parse them as integers
  const amountValue = parseInt(amount.value, 10);
  const initialDelayValue = parseInt(delay.value, 10);
  const stepValue = parseInt(step.value, 10);

  // Loop to create and handle a specified number of promises
  for (let i = 0; i < amountValue; i += 1) {
    // Create a promise with an incremented position and calculated delay
    createPromise(i + 1, initialDelayValue + (i * stepValue))
      .then((result) => {
        // Display a success notification with position and delay when the promise resolves
        Notiflix.Notify.success(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
      })
      .catch((result) => {
        // Display a failure notification with position and delay when the promise is rejected
        Notiflix.Notify.failure(`❌ Rejected promise ${result.position} in ${result.delay}ms`);
      });
  }
}