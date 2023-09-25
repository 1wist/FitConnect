const bookmarkedList = document.getElementById('bookmarkedList');
let savedBookmarkedExercises = JSON.parse(localStorage.getItem("bookmarkedExercises")) || []; //key value in local storage, retrieves respective value from key 'bookmarkedExercises'

function displayBookmarkedExercises() {
    bookmarkedList.innerHTML = '';
    for (const exercise of savedBookmarkedExercises) {
        const exerciseElement = document.createElement('div');
        exerciseElement.className = 'bookmarked-exercise';
        exerciseElement.innerHTML = `
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
            <h2 class="exercise-name" id="${exercise.name.replace(/\s/g, '')}" style= "margin-block-start: 0.83em;
            margin-block-end: 0.83em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-size: 24px;">${exercise.name}</h2>
            <p style="  margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-size: 16px;">Duration: ${exercise.duration}</p>
          </div>
        </div>
      `;
        console.log(exerciseElement)
        bookmarkedList.appendChild(exerciseElement);
    }

    //default code for button
    const addButtonHTML = document.createElement('button');
    addButtonHTML.className = 'bookmark-icon';
    addButtonHTML.id = 'toggleBookmarkButton';


    if (savedBookmarkedExercises.length === 0) {
        const exerciseElement = document.createElement('div');
        exerciseElement.innerHTML = `
    <h3>You have no bookmarked exercises.</h3>

    `;
        bookmarkedList.appendChild(exerciseElement);
    }
    console.log("this works")
}

displayBookmarkedExercises();
console.log("error")

function toggleBookmark() {
    console.log("something happened")
    window.location.href = 'workout.html';
    console.log("this changed the screen")
}
console.log("check")

//javascript code for linking individual
function testing(thing) {
    const stuff = thing.id;
    window.location.href = `${stuff}.html`
}

const h2Array = document.querySelectorAll("h2");
    h2Array.forEach((thingy) => {
        if (thingy.classList.contains('exercise-name')) {
            thingy.addEventListener("click", function(){
                testing(thingy);
            });
        };
    });
