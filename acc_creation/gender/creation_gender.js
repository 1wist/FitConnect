// Get references to the male and female buttons
const maleButton = document.getElementById("male-button");
const femaleButton = document.getElementById("female-button");
const noButton = document.getElementById("no-button");

// Add click event listeners to the buttons
maleButton.addEventListener("click", () => {
    maleButton.style.backgroundColor = "#FFB600";
    femaleButton.style.backgroundColor = "#B9B9B9";
    noButton.style.backgroundColor = "#B9B9B9";
    window.location.href = "../age/age.html"
});

femaleButton.addEventListener("click", () => {
    femaleButton.style.backgroundColor = "#FFB600";
    maleButton.style.backgroundColor = "#B9B9B9";
    noButton.style.backgroundColor = "#B9B9B9";
    window.location.href = "../age/age.html"
});

noButton.addEventListener("click", () => {
    noButton.style.backgroundColor = "#FFB600";
    femaleButton.style.backgroundColor = "#B9B9B9";
    femaleButton.style.backgroundColor = "#B9B9B9";
    window.location.href = "../age/age.html"
});
