const exerciseList = document.getElementById('exerciseList');
const beginnerBtn = document.getElementById('beginnerBtn');
const intermediateBtn = document.getElementById('intermediateBtn');
const advancedBtn = document.getElementById('advancedBtn');
const bookmarkModal = document.getElementById('bookmarkIconTop');

const beginnerExercises = [
    { name: 'Yoga', duration: '15 minutes', image: 'yoga.jpg' },
    { name: 'Cardio', duration: '30 minutes', image: 'cardio.jpg' },
    { name: 'Meditation', duration: '5 minutes', image: 'meditation.jpg' }
];

const intermediateExercises = [
    { name: 'Zumba', duration: '30 minutes', image: 'zumba1.jpg' },
    { name: 'Pilates', duration: '20 minutes', image: 'pilates.jpg' }
];

const advancedExercises = [
    { name: 'Gym', duration: '30 minutes', image: 'gym.jpg' },
    { name: 'Kick Boxing', duration: '30 minutes', image: 'kickboxing.jpg' }
];


// Get a reference to the image elements
const beginnerImages = document.querySelectorAll('.beginner-exercise img');
const intermediateImages = document.querySelectorAll('.intermediate-exercise img');
const advancedImages = document.querySelectorAll('.advanced-exercise img');

// Set the class names for each group of images
beginnerImages.forEach((image) => {
    image.classList.add('beginner-image');
});

intermediateImages.forEach((image) => {
    image.classList.add('intermediate-image');
});

advancedImages.forEach((image) => {
    image.classList.add('advanced-image');
});




const bookmarkedExercises = [];

// Load bookmarked exercises from local storage
const savedBookmarkedExercises = JSON.parse(localStorage.getItem('bookmarkedExercises'));
if (savedBookmarkedExercises) {
    bookmarkedExercises.push(...savedBookmarkedExercises);
}

const searchIconTop = document.getElementById('searchIconTop');
const myInput = document.getElementById('myInput');
const allExercises = beginnerExercises.concat(intermediateExercises, advancedExercises);

document.getElementById("myUL").style.display = 'none'

let filteredExercises = [];
let currentExercises = beginnerExercises; // Store the currently displayed exercises

searchIconTop.addEventListener('click', () => {
    myInput.style.display = 'block'; // Show the search input

    myInput.focus(); // Focus on the input field
});

myInput.addEventListener('keyup', () => {
    const searchTerm = myInput.value.trim().toLowerCase();
    if (searchTerm) {
        filteredExercises = allExercises.filter(exercise =>
            exercise.name.toLowerCase().includes(searchTerm)
        );
        displayExercises(filteredExercises);
    } else {
        displayExercises(currentExercises); // Display the exercises based on current difficulty level
    }
});

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


function createExerciseElement(exercise) {
    const exerciseDiv = document.createElement('div');
    exerciseDiv.className = 'exercise';
    // exerciseDiv.style.backgroundImage = `url('images/${exercise.image}')`;
    exerciseDiv.innerHTML = `
    <div>
    <div style = "height: 250px; width: 250px;">
    <img src="images/${exercise.image}" style = "width: 100%; height: 100%; object-fit: cover; filter: blur(2px);">
    </div>
      <div style = "position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      text-align: center;">
        <h2 class="exercise-name" id="${exercise.name.replace(/\s/g, '')}">${exercise.name}</h2>
        <p style="margin-top: 20px;">Duration: ${exercise.duration}</p>
      </div>
    </div>
    <div id="rec-icons">
    <i class="fa-solid fa-star"></i>
    </div>
    <div class="bookmark-icon ${isBookmarked(exercise) ? 'bookmarked' : ''}" data-exercise-name="${exercise.name}">
      ${isBookmarked(exercise) ? '<i class="fa-solid fa-bookmark"></i>' : '<i class="fa-regular fa-bookmark"></i>'}
    </div>
  `;

    const bookmarkIcon = exerciseDiv.querySelector('.bookmark-icon');
    bookmarkIcon.addEventListener('click', () => {
        toggleBookmark(exercise);
        updateBookmarkIcon(bookmarkIcon, isBookmarked(exercise));
    });

    return exerciseDiv;
}

function isBookmarked(exercise) {
    return bookmarkedExercises.some(item => item.name === exercise.name);
}

function toggleBookmark(exercise) {
    const index = bookmarkedExercises.findIndex(item => item.name === exercise.name);
    if (index !== -1) {
        bookmarkedExercises.splice(index, 1);
    } else {
        bookmarkedExercises.push(exercise);
    }

    // Save the updated bookmarks to localStorage
    localStorage.setItem('bookmarkedExercises', JSON.stringify(bookmarkedExercises));
}

// Add event listener to the bookmark icon
bookmarkModal.addEventListener('click', () => {
    // displayBookmarkedExercises();
    window.location.href = 'bookmarks.html';
});

function updateBookmarkIcon(iconElement, isMarked) {
    iconElement.innerHTML = isMarked ? '<i class="fa-solid fa-bookmark"></i>' : '<i class="fa-regular fa-bookmark"></i>';
}

//javascript code for linking individual
function testing(thing) {
    const stuff = (thing.id).toLowerCase();;
    window.location.href = `${stuff}.html`
}
function runThis() {
    const h2Array = document.querySelectorAll("h2");
    h2Array.forEach((thingy) => {
        if (thingy.classList.contains('exercise-name')) {
            thingy.addEventListener("click", function () {
                testing(thingy);
            });
        };
    });
};

function displayExercises(exerciseArray) {
    exerciseList.innerHTML = '';
    for (const exercise of exerciseArray) {
        const exerciseElement = createExerciseElement(exercise);
        exerciseList.appendChild(exerciseElement);
    }
    runThis()
}








// Function to close the bookmark container (modal)
function closeBookmarkContainer() {
    const bookmarkContainer = document.getElementById('bookmarkContainer');
    bookmarkContainer.style.display = 'none';
}

const allBtn = document.getElementById('allBtn');
allBtn.addEventListener('click', () => {
    currentExercises = allExercises;
    displayExercises(allExercises);
    // Add the "active" class to the "All" button to highlight it
    allBtn.classList.add('active');
    beginnerBtn.classList.remove('active');
    intermediateBtn.classList.remove('active');
    advancedBtn.classList.remove('active');
});

beginnerBtn.addEventListener('click', () => {
    currentExercises = beginnerExercises;
    displayExercises(beginnerExercises);
    // Add the "active" class to the clicked button and remove it from others
    beginnerBtn.classList.add('active');
    intermediateBtn.classList.remove('active');
    advancedBtn.classList.remove('active');
    allBtn.classList.remove('active');
});

intermediateBtn.addEventListener('click', () => {
    currentExercises = intermediateExercises;
    displayExercises(intermediateExercises);
    // Add the "active" class to the clicked button and remove it from others
    intermediateBtn.classList.add('active');
    beginnerBtn.classList.remove('active');
    advancedBtn.classList.remove('active');
    allBtn.classList.remove('active');
});

advancedBtn.addEventListener('click', () => {
    currentExercises = advancedExercises;
    displayExercises(advancedExercises);
    // Add the "active" class to the clicked button and remove it from others
    advancedBtn.classList.add('active');
    beginnerBtn.classList.remove('active');
    intermediateBtn.classList.remove('active');
    allBtn.classList.remove('active');
});
displayExercises(allExercises);
allBtn.classList.add('active');



const quickWorkoutBtn = document.getElementById('quickWorkoutBtn');

quickWorkoutBtn.addEventListener('click', () => {
    // Store the selected category in local storage
    // localStorage.setItem('selectedCategory', currentExercises === beginnerExercises ? 'beginner' : 'all');
    // Redirect to the quick workout page
    window.location.href = 'quick-workout.html';
});


