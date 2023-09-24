/*
This script is an extension to the one written
by Mateusz Rybczonec on his CSS Tricks Blog

Blog Link: https://bit.ly/3nH3AhO

OG Pen Link : https://bit.ly/3fi7xXj
*/

const FULL_DASH_ARRAY = 283;
const RESET_DASH_ARRAY = `-57 ${FULL_DASH_ARRAY}`;

//All buttons
let startBtn = document.querySelector(".start");
let stopBtn = document.querySelector(".stop");
let resetBtn = document.querySelector(".reset");

//DOM elements
let timer = document.querySelector("#base-timer-path-remaining");
let timeLabel = document.getElementById("base-timer-label");

//Time related vars
const TIME_LIMIT = 30; //in seconds
let timePassed = -1;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

function reset() {
    clearInterval(timerInterval);
    resetVars();
    startBtn.innerHTML = "Start";
    timer.setAttribute("stroke-dasharray", RESET_DASH_ARRAY);
}

function start(withReset = false) {
    setDisabled(startBtn);
    removeDisabled(stopBtn);
    if (withReset) {
        resetVars();
    }
    startTimer();
}

function stop() {
    setDisabled(stopBtn);
    removeDisabled(startBtn);
    startBtn.innerHTML = "Continue";
    clearInterval(timerInterval);
}

// function startTimer() {
//     timerInterval = setInterval(() => {
//         timePassed = timePassed += 1;
//         timeLeft = TIME_LIMIT - timePassed;
//         timeLabel.innerHTML = formatTime(timeLeft);
//         setCircleDasharray();

//         if (timeLeft === 0) {
//             timeIsUp();
//         }
//     }, 1000);
// }
const rightArrow = document.getElementById("right-arrow-link")
function startTimer() {
    if (rightArrow.classList.contains("disabled")) {
        ;
    } else {
        rightArrow.classList += ("disabled");
    }
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        timeLabel.innerHTML = formatTime(timeLeft);
        setCircleDasharray();

        if (timeLeft === 0) {
            document.getElementById("right-arrow-link").classList.remove("disabled");
            timeIsUp();
        } 
        

        // // Enable the left arrow link when the timer reaches 30 seconds
        // if (timeLeft >= 30  ) {
        //     document.getElementById('right-arrow-link').removeAttribute('disabled');
        //     console.log("disabled removed")
        // }
    }, 1000);
}

window.addEventListener("load", () => {
    timeLabel.innerHTML = formatTime(TIME_LIMIT);
    setDisabled(stopBtn);
});

//---------------------------------------------
//HELPER METHODS
//---------------------------------------------
function setDisabled(button) {
    button.setAttribute("disabled", "disabled");
}

function removeDisabled(button) {
    button.removeAttribute("disabled");
}
function timeIsUp() {
    setDisabled(startBtn);
    removeDisabled(stopBtn);
    clearInterval(timerInterval);
    let confirmReset = confirm("Time is up! Want to restart?");
    if (confirmReset) {
        reset();
        // change this part cuz start button shld run
        startTimer();
    } else {
        reset();
    }
}

function resetVars() {
    removeDisabled(startBtn);
    setDisabled(stopBtn);
    timePassed = -1;
    timeLeft = TIME_LIMIT;
    console.log(timePassed, timeLeft);
    timeLabel.innerHTML = formatTime(TIME_LIMIT);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    console.log("setCircleDashArray: ", circleDasharray);
    timer.setAttribute("stroke-dasharray", circleDasharray);
}


// Function to handle the start of a drag
function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

// Function to handle the dragover event (allowing the drop)
function handleDragOver(event) {
    event.preventDefault();
}

// Function to handle the drop event (reordering exercises)
function handleDrop(event) {
    event.preventDefault();
    const exerciseId = event.dataTransfer.getData("text/plain");
    const targetElement = event.target.closest('.yoga-pose');

    if (targetElement && !targetElement.contains(document.getElementById(exerciseId))) {
        // Reorder exercises based on the drop location
        const currentIndex = exerciseOrder.indexOf(exerciseId);
        const targetIndex = exerciseOrder.indexOf(targetElement.id);

        exerciseOrder.splice(currentIndex, 1);
        exerciseOrder.splice(targetIndex, 0, exerciseId);

        // Update the display order
        updateExerciseOrder();
    }
}


// Handle click events

// Get all exercise elements
const exercise1 = document.getElementById("exercise1");
const exercise2 = document.getElementById("exercise2");
const exercise3 = document.getElementById("exercise3");

// Initialize exercise order from local storage or the default order
let exerciseOrder = JSON.parse(localStorage.getItem("exerciseOrder")) || ["exercise1", "exercise2", "exercise3"];

// Add click event listeners to each exercise
exercise1.addEventListener("click", () => handleExerciseClick("exercise1"));
exercise2.addEventListener("click", () => handleExerciseClick("exercise2"));
exercise3.addEventListener("click", () => handleExerciseClick("exercise3"));

// Function to handle exercise click
function handleExerciseClick(exerciseId) {
    const index = exerciseOrder.indexOf(exerciseId);
    if (index !== -1) {
        // If the exercise is already selected, deselect it
        exerciseOrder.splice(index, 1);
    } else {
        // If the exercise is not selected, select it
        exerciseOrder.push(exerciseId);
    }
    updateExerciseSelection();
}

// Function to update exercise selection UI
function updateExerciseSelection() {
    // Remove the "selected" class from all exercises
    const exercises = document.querySelectorAll(".yoga-pose");
    exercises.forEach((exercise) => {
        exercise.classList.remove("selected");
    });

    // Add the "selected" class to the selected exercises
    exerciseOrder.forEach((exerciseId) => {
        const selectedElement = document.getElementById(exerciseId);
        if (selectedElement) {
            selectedElement.classList.add("selected");
        }
    });

    // Store the updated exercise order in local storage
    localStorage.setItem("exerciseOrder", JSON.stringify(exerciseOrder));
}

// Store an array of selected exercises
let selectedExercises = [];

// Function to handle exercise click
function handleExerciseClick(exerciseId) {
    const index = selectedExercises.indexOf(exerciseId);
    if (index !== -1) {
        // If the exercise is already selected, deselect it
        selectedExercises.splice(index, 1);
    } else {
        // If the exercise is not selected, select it
        selectedExercises.push(exerciseId);
    }
    updateExerciseSelection();
}

// Function to update exercise selection UI
function updateExerciseSelection() {
    // Remove the "selected" class from all exercises
    const exercises = document.querySelectorAll(".yoga-pose");
    exercises.forEach((exercise) => {
        exercise.classList.remove("selected");
    });

    // Add the "selected" class to the selected exercises
    selectedExercises.forEach((exerciseId) => {
        const selectedElement = document.getElementById(exerciseId);
        if (selectedElement) {
            selectedElement.classList.add("selected");
        }
    });
}

// Function to handle the drop event (reordering exercises)
function handleDrop(event) {
    event.preventDefault();
    const exerciseId = event.dataTransfer.getData("text/plain");
    const targetElement = event.target.closest('.yoga-pose');

    if (targetElement && !targetElement.contains(document.getElementById(exerciseId))) {
        // Reorder exercises based on the drop location
        const currentIndex = exerciseOrder.indexOf(exerciseId);
        const targetIndex = exerciseOrder.indexOf(targetElement.id);

        exerciseOrder.splice(currentIndex, 1);
        exerciseOrder.splice(targetIndex, 0, exerciseId);

        // Get the parent element containing exercises
        const yogaDiv = document.querySelector(".yoga");

        // Get all exercises
        const exercises = Array.from(yogaDiv.querySelectorAll(".yoga-pose"));

        // Rearrange the exercises based on the updated order
        exercises.sort((a, b) => {
            const aIndex = exerciseOrder.indexOf(a.id);
            const bIndex = exerciseOrder.indexOf(b.id);
            return aIndex - bIndex;
        });

        // Append the sorted exercises back to the parent container
        exercises.forEach((exercise) => {
            yogaDiv.appendChild(exercise);
        });
    }
}
