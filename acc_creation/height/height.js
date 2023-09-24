// age.js
document.addEventListener("DOMContentLoaded", function () {
    const ageDisplay = document.getElementById('selected-age');
    const ageOptions = document.querySelector('.age-options');

    // Function to generate age options
    function generateAgeOptions() {
        for (let age = 130; age <= 250; age++) { // Customize the age range as needed
            const ageOption = document.createElement('li');
            ageOption.textContent = age;
            ageOptions.appendChild(ageOption);
        }
    }

    generateAgeOptions();

    let selectedItem = 0;

    ageOptions.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            ageDisplay.textContent = event.target.textContent;
            const ageArray = document.querySelectorAll('li');
            ageArray.forEach((age) => {
                age.classList.remove("selectedAge");
            })
            event.target.classList.add("selectedAge");
        }
    });

    ageOptions.addEventListener('wheel', (event) => {
        // Detect mouse wheel event to scroll through ages
        event.preventDefault(); // Prevent the default scrolling behavior

        if (event.deltaY > 0) {
            // Scroll down
            selectedItem = Math.min(selectedItem + 1, ageOptions.children.length - 1);
        } else {
            // Scroll up
            selectedItem = Math.max(selectedItem - 1, 0);
        }

        const itemHeight = ageOptions.children[0].offsetHeight;
        const maxScroll = (ageOptions.children.length - 10) * itemHeight; // Show 10 ages at a time

        // Ensure selectedItem stays within bounds
        selectedItem = Math.min(selectedItem, ageOptions.children.length - 10);
        selectedItem = Math.max(selectedItem, 0);

        ageOptions.style.transform = `translateY(-${selectedItem * itemHeight}px)`;
        ageDisplay.textContent = ageOptions.children[selectedItem].textContent;
    });
});


