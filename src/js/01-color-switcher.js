// Select the "Start" and "Stop" buttons using their data attributes
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

// Initialize variables
let intervalId = null; // Stores the interval ID for the color-changing process
let isRunning = false; // Flag to track if the color-changing process is running or not

// Function to generate a random hex color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Function to change the background color of the body
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

// Event listener for the "Start" button click
startBtn.addEventListener('click', () => {
  // Check if the color-changing process is not already running
  if (!isRunning) {
    // Start the color-changing process by setting an interval to call changeBackgroundColor every 1 second
    intervalId = setInterval(changeBackgroundColor, 1000); 
    isRunning = true; // Set the flag to indicate that the process is running
    
    // Disable the "Start" button to prevent starting multiple processes
    startBtn.disabled = true; 

    // Enable the "Stop" button to allow stopping the process
    stopBtn.disabled = false; 
  }
});

// Event listener for the "Stop" button click
stopBtn.addEventListener('click', () => {
  // Check if the color-changing process is currently running
  if (isRunning) {
    // Stop the color-changing process by clearing the interval
    clearInterval(intervalId); 
    isRunning = false; // Set the flag to indicate that the process is not running
    
    // Enable the "Start" button to allow starting the process again
    startBtn.disabled = false; 

    // Disable the "Stop" button since the process is stopped
    stopBtn.disabled = true; 
  }
});