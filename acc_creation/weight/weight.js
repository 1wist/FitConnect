// weight.js
document.addEventListener("DOMContentLoaded", function () {
    const weightOptions = document.querySelector('.weight-options');

    // Function to generate weight options
    function generateWeightOptions() {
        for (let weight = 30; weight <= 150; weight++) {
            const weightOption = document.createElement('li');
            weightOption.textContent = weight; // Remove "kg" from text content
            weightOptions.appendChild(weightOption);

            weightOption.addEventListener('click', () => {
                selectWeight(weightOption);
            });
        }
    }

    generateWeightOptions();

    let selectedItem = null;

    function selectWeight(weightOption) {
        if (selectedItem) {
            selectedItem.classList.remove('selected');
        }

        selectedItem = weightOption;
        weightOption.classList.add('selected');
    }

    new Glide('.weight-scroll', {
        type: 'carousel',
        startAt: 60, // Start at the middle (e.g., 90 kg)
        perView: 7, // Show 7 items at a time (adjust as needed)
        focusAt: 'center', // Center the initially selected item
        gap: 20, // Add some gap between items (adjust as needed)
        animationDuration: 400, // Adjust the animation duration for smoother scrolling
    }).mount();
});
