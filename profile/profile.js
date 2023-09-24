const changeColorButton = document.getElementById('change-color');
const profileBackground = document.querySelector('.profile-background');
const colorPicker = document.getElementById('color-picker');
const colorSelect = document.getElementById('color-select');
const profileImageInput = document.getElementById('profile-image-input');
const editProfileButton = document.getElementById('edit-profile');
const saveProfileButton = document.getElementById('save-profile');
const nameDisplay = document.getElementById('nameDisplay');
const emailDisplay = document.getElementById('emailDisplay');
const phoneDisplay = document.getElementById('phoneDisplay');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const editGoalWeightLoss = document.getElementById('edit-goal-weight-loss');
const editGoalMuscleGain = document.getElementById('edit-goal-muscle-gain');
const editGoalMaintenance = document.getElementById('edit-goal-maintenance');
const editGoalOverallHealth = document.getElementById('edit-goal-overall-health');
const goalWeightLoss = document.getElementById('goalWeightLoss');
const goalMuscleGain = document.getElementById('goalMuscleGain');
const goalMaintenance = document.getElementById('goalMaintenance');
const goalOverallHealth = document.getElementById('goalOverallHealth');
const currentWeightDisplay = document.getElementById('currentWeightDisplay');
const targetWeightDisplay = document.getElementById('targetWeightDisplay');
const heightDisplay = document.getElementById('heightDisplay');
const currentWeightInput = document.getElementById('currentWeightInput');
const targetWeightInput = document.getElementById('targetWeightInput');
const heightInput = document.getElementById('heightInput');
const additionalProfileDetails = document.getElementById('additional-profile-details');
const editForm = document.getElementById('edit-form');
const profilePicture = document.querySelector('.profile-picture');

// Load saved data from Local Storage
window.addEventListener('load', () => {
    loadUserData();
    loadBackgroundColor();
    loadAdditionalProfileData();
    loadpfp();
});

changeColorButton.addEventListener('click', () => {
    colorPicker.style.display = 'block';
});

colorSelect.addEventListener('change', () => {
    profileBackground.style.backgroundColor = colorSelect.value;
    colorPicker.style.display = 'none';
    saveBackgroundColor(colorSelect.value);
});

profileImageInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            // Convert image file to base64 string and save to localStorage
            localStorage.setItem("pfpmedia", reader.result);
            profilePicture.innerHTML = `<img src="${reader.result}">`;
        }, false);

        reader.readAsDataURL(selectedFile);
    }
});

editProfileButton.addEventListener('click', () => {
    nameInput.value = nameDisplay.innerText;
    emailInput.value = emailDisplay.innerText;
    phoneInput.value = phoneDisplay.innerText;
    additionalProfileDetails.style.display = 'none'; // Hide additional details when editing
    editProfileButton.style.display = 'none';
    document.getElementById("edit-form").style.display = "block";
});

saveProfileButton.addEventListener('click', () => {
    nameDisplay.innerText = nameInput.value;
    emailDisplay.innerText = emailInput.value;
    phoneDisplay.innerText = phoneInput.value;

    // Update additional profile details
    goalWeightLoss.checked = editGoalWeightLoss.checked;
    goalMuscleGain.checked = editGoalMuscleGain.checked;
    goalMaintenance.checked = editGoalMaintenance.checked;
    goalOverallHealth.checked = editGoalOverallHealth.checked;

    // Update physical information
    currentWeightDisplay.textContent = currentWeightInput.value || '---';
    targetWeightDisplay.textContent = targetWeightInput.value || '---';
    heightDisplay.textContent = heightInput.value || '---';

    editForm.style.display = 'none';
    additionalProfileDetails.style.display = 'block'; // Show additional details after editing
    editProfileButton.style.display = 'block';

    // Save additional profile details
    localStorage.setItem('goalWeightLoss', goalWeightLoss.checked);
    localStorage.setItem('goalMuscleGain', goalMuscleGain.checked);
    localStorage.setItem('goalMaintenance', goalMaintenance.checked);
    localStorage.setItem('goalOverallHealth', goalOverallHealth.checked);
    localStorage.setItem('currentWeight', currentWeightInput.value);
    localStorage.setItem('targetWeight', targetWeightInput.value);
    localStorage.setItem('height', heightInput.value);

    // Save all user data
    saveUserData(nameInput.value, emailInput.value, phoneInput.value);
    document.getElementById("edit-form").style.display = "none";
});

function loadUserData() {
    const savedName = localStorage.getItem('profileName');
    const savedEmail = localStorage.getItem('profileEmail');
    const savedPhone = localStorage.getItem('profilePhone');

    if (savedName) {
        nameDisplay.innerText = savedName;
        nameInput.value = savedName;
    }

    if (savedEmail) {
        emailDisplay.innerText = savedEmail;
        emailInput.value = savedEmail;
    }

    if (savedPhone) {
        phoneDisplay.innerText = savedPhone;
        phoneInput.value = savedPhone;
    }
}

function loadpfp() {
    const pfp = localStorage.getItem("pfpmedia");

    if (pfp) {
        profilePicture.innerHTML = `<img src="${pfp}">`;
    }
}

function saveUserData(name, email, phone) {
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileEmail', email);
    localStorage.setItem('profilePhone', phone);
}

function saveBackgroundColor(color) {
    localStorage.setItem('backgroundColor', color);
}

function savepfp(pfp) {
    localStorage.setItem("pfpmedia", pfp);
}

function loadBackgroundColor() {
    const savedColor = localStorage.getItem('backgroundColor');

    if (savedColor) {
        profileBackground.style.backgroundColor = savedColor;
        colorSelect.value = savedColor;
    }
}

function loadAdditionalProfileData() {
    // Load fitness goals
    goalWeightLoss.checked = localStorage.getItem('goalWeightLoss') === 'true';
    goalMuscleGain.checked = localStorage.getItem('goalMuscleGain') === 'true';
    goalMaintenance.checked = localStorage.getItem('goalMaintenance') === 'true';
    goalOverallHealth.checked = localStorage.getItem('goalOverallHealth') === 'true';

    // Load physical information
    currentWeightDisplay.textContent = localStorage.getItem('currentWeight') || '---';
    targetWeightDisplay.textContent = localStorage.getItem('targetWeight') || '---';
    heightDisplay.textContent = localStorage.getItem('height') || '---';
}
