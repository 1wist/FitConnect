//  CALENDAR CODE
const currentDate = document.querySelector(".current-date");
daysTag = document.querySelector(".days");
prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), //getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), //getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), //getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); //getting last date of previous month

    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;    
        
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        //console.log(i) //runs through all the days of the months   
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                        &&currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" onclick="selectDate(${i})">${i}</li>`;   //assigns active class? to current day?
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;    
        
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

renderCalendar(); //default month, current day

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", ()=> {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth +1;

        if(currMonth<0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); //updating current date year with new year
            currMonth = date.getMonth(); 
        } else { //else pass new date as date value
            date = new Date ();
        }
        renderCalendar(); //change all month days accordingly
    })
});

function selectDate(day) {
    // Convert the NodeList to an array
    const allDateElements = Array.from(document.querySelectorAll('.days li'));

    // Remove the "selected" class from all date elements
    allDateElements.forEach(element => {
        element.classList.remove('selected');
    });

    // Find the index of the clicked day in the displayed calendar
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    const startIndex = firstDayOfMonth;
    const clickedDateIndex = day + startIndex - 1;

    // Add the "selected" class to the clicked date
    if (clickedDateIndex >= 0 && clickedDateIndex < allDateElements.length) {
        const clickedDateElement = allDateElements[clickedDateIndex];
        clickedDateElement.classList.add('selected');
    }

    // Log the selected date
    // console.log(`Selected date: ${months[currMonth]} ${day}, ${currYear}`);
}




// CAMERA CODE
// Get DOM elements
const startCameraButton = document.getElementById("start-camera");
const stopCameraButton = document.getElementById("stop-camera");
const capturePhotoButton = document.getElementById("capture-photo");
const videoFeed = document.getElementById("video-feed");
const captureCanvas = document.getElementById("capture-canvas");
const imagePreview = document.getElementById("image-preview");
const uploadPhotoInput = document.getElementById("upload-photo");
const saveImageMeal = document.getElementById("save-image-meal");

let stream;
let isCameraOn = false;

// Start the camera
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoFeed.srcObject = stream;
        isCameraOn = true;
        startCameraButton.disabled = true;
        stopCameraButton.disabled = false;
        saveImageMeal.style.display = "block";
        // capturePhotoButton.disabled = false;
    } catch (error) {
        console.error("Error accessing the camera:", error);
    }
}

// Stop the camera
function stopCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoFeed.srcObject = null;
        isCameraOn = false;
        startCameraButton.disabled = false;
        stopCameraButton.disabled = true;
        // capturePhotoButton.disabled = true;
    }
}

// Capture a photo
function capturePhoto() {
    if (isCameraOn) {
        captureCanvas.width = videoFeed.videoWidth;
        captureCanvas.height = videoFeed.videoHeight;
        const ctx = captureCanvas.getContext("2d");
        ctx.drawImage(videoFeed, 0, 0, captureCanvas.width, captureCanvas.height);
        imagePreview.src = captureCanvas.toDataURL("image/png");
        uploadPhotoInput.style.display = "block";
    }
}
const cameraButton = document.getElementById("capture-photo");

cameraButton.addEventListener("mousedown", () => {
    cameraButton.classList.add("active");
});

cameraButton.addEventListener("mouseup", () => {
    cameraButton.classList.remove("active");
});

cameraButton.addEventListener("mouseleave", () => {
    cameraButton.classList.remove("active");
});

// Event listeners for buttons
startCameraButton.addEventListener("click", startCamera);
stopCameraButton.addEventListener("click", stopCamera);
capturePhotoButton.addEventListener("click", capturePhoto);
uploadPhotoInput.addEventListener("change", handleImageUpload);

function handleImageUpload() {
    const file = uploadPhotoInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}



// mess of code to display things
document.getElementById("camera-area").style.display = "none";
const waterIntakeNull = document.getElementById("nullWaterIntake");
const editWaterIntakeArea = document.getElementById("editWaterIntakeArea");
const displayWaterIntakeArea = document.getElementById("DisplayWaterIntakeArea");
const mealListNull = document.getElementById("nullMealList");
const nutritionFactsArea = document.getElementById("nutritionFactsArea");

const breakfastButton = document.getElementById("breakfast-button");
const lunchButton = document.getElementById("lunch-button");

document.addEventListener("DOMContentLoaded", function () {
    const mealButtons = document.querySelectorAll('.meal-button');
    // Function to handle button click
    function handleButtonClick(thing) {
        // Remove the "selected" class from all buttons
        mealButtons.forEach(button => {
            button.classList.remove('selectedMeal');
        });
        // Add the "selected" class to the clicked button
        thing.classList.add('selectedMeal');    
        // console.log(thing)



        //hard coded for snack meal (Leave as null)
        if (thing.id == "snack-button") {
            mealListNull.style.display = "flex";
        } else {
            mealListNull.style.display = "none";
        }
        //for water (specifically different thing to display?)
        if (thing.id == "water-button") {
            waterIntakeNull.style.display = "flex";
            editWaterIntakeArea.style.display = "flex";
            displayWaterIntakeArea.style.display = "none";
        } else {
            waterIntakeNull.style.display = "none";
            editWaterIntakeArea.style.display = "none";
            displayWaterIntakeArea.style.display = "none";
        }
        //to show breakfast lunch nutrition 
        if (thing.id == "breakfast-button" || thing.id == "lunch-button") {
            nutritionFactsArea.style.display = "flex";
        } else {
            nutritionFactsArea.style.display = "none";
        }
        //to show camera only when null
        if (mealListNull.style.display == "flex") {
            document.getElementById("camera-area").style.display = "flex";
        } else {
            document.getElementById("camera-area").style.display = "none";
        }
    }

    mealButtons.forEach((button) => {
        button.addEventListener("click", function(){
            handleButtonClick(button);
        });
    })
});

function saveWaterIntake() {
    const waterIntake = document.getElementById("water-intake").value
    const measurement = document.getElementById("measurement").value;
    localStorage.setItem ("water-intake", waterIntake);
    localStorage.setItem("water-measurement", measurement);
    waterIntakeNull.style.display = "none";
    editWaterIntakeArea.style.display = "none";
    displayWaterIntakeArea.style.display = "flex";
    document.getElementById("water-intake-display").innerHTML = waterIntake;
    document.getElementById("measurement-display").innerHTML = measurement;
}
function editMeal() {
    nutritionFactsArea.style.display = "none";
    document.getElementById("camera-area").style.display = "flex";

}
function editWaterIntake() {
    waterIntakeNull.style.display = "none";
    editWaterIntakeArea.style.display = "flex";
    displayWaterIntakeArea.style.display = "none";
}



//selecting to show calories by day, week, or month
const selectButtons = document.querySelectorAll('.selectButtons');
const calByDay = document.getElementById("cal-by-day");
const calByWeek = document.getElementById("cal-by-week");
const calByMonth = document.getElementById("cal-by-month");
const chooseYourCharacter = document.getElementById("chooseYourCharacter");
function showCalDay(item) {
    //class for showButtonSelected
    selectButtons.forEach((button) => {
        button.classList.remove("showButtonSelected");
    });
    item.classList.add("showButtonSelected");

    //displaying by day
    calByDay.style.display = "flex";
    calByWeek.style.display = "none";
    calByMonth.style.display = "none";
    chooseYourCharacter.style.display = "flex";
    //display none for everything
    nutritionFactsArea.style.display = "none";
    waterIntakeNull.style.display = "none";
    mealListNull.style.display = "none";
    document.getElementById("camera-area").style.display = "none";
    editWaterIntakeArea.style.display = "none";
    displayWaterIntakeArea.style.display = "none";
};
function showCalWeek (item) {
    //class for showButtonSelected
    selectButtons.forEach((button) => {
        button.classList.remove("showButtonSelected");
    });
    item.classList.add("showButtonSelected");

    //displaying by week
    calByDay.style.display = "none";
    calByWeek.style.display = "flex";
    calByMonth.style.display = "none";
    //display none for everything
    chooseYourCharacter.style.display = "none";
    nutritionFactsArea.style.display = "none";
    waterIntakeNull.style.display = "none";
    mealListNull.style.display = "none";
    document.getElementById("camera-area").style.display = "none";
    editWaterIntakeArea.style.display = "none";
    displayWaterIntakeArea.style.display = "none";
};
function showCalMonth (item) {
    //class for showButtonSelected
    selectButtons.forEach((button) => {
        button.classList.remove("showButtonSelected");
    });
    item.classList.add("showButtonSelected");
    //displaying by month
    calByDay.style.display = "none";
    calByWeek.style.display = "none";
    calByMonth.style.display = "flex";
    //display none for everything
    chooseYourCharacter.style.display = "none";
    nutritionFactsArea.style.display = "none";
    waterIntakeNull.style.display = "none";
    mealListNull.style.display = "none";
    document.getElementById("camera-area").style.display = "none";
    editWaterIntakeArea.style.display = "none";
    displayWaterIntakeArea.style.display = "none";
};
//default display by day
showCalDay(document.getElementById("showByDay"))


// for display by week chart graph
// Configuration options for the chart
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
};
// Data for the line chart
const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Sample Data',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        data: [10, 20, 15, 25, 30, 35, 50, 30, 25, 60, 70, 50],
    }]
};
// Get the canvas element and create the chart
const ctx = document.getElementById('line-chart').getContext('2d');
const lineChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions,
});




//API CODE




function saveMeal() { 
    //CODE TO SWITCH DISPLAY
    document.getElementById("camera-area").style.display = "none";
    nutritionFactsArea.style.display = "flex";
    mealListNull.style.display = "none";

    //API CODE?
};