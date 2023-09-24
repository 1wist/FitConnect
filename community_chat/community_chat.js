const messageInput = document.getElementById('messageInput');
const captureButton = document.getElementById('captureButton');
const sendButton = document.getElementById('sendButton');
const videoPreview = document.getElementById('videoPreview');
const chatArea = document.getElementById('chatArea');
const cameraModal = document.getElementById('cameraModal');
const capturePhotoButton = document.getElementById('capturePhotoButton');
const closeCameraButton = document.getElementById('closeCameraButton');
const cameraPreview = document.getElementById('cameraPreview');

let videoStream = null;

// Capture button click event
captureButton.addEventListener('click', async () => {
    try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoPreview.style.display = 'none';
        cameraModal.style.display = 'block';
        startCameraPreview();
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
});

// Capture photo button click event
capturePhotoButton.addEventListener('click', () => {
    if (videoStream) {
        const capturedImage = captureFrame(cameraPreview);
        sendMessageWithImage(capturedImage);
        stopCameraPreview();
        cameraModal.style.display = 'none';
    }
});

// Close camera modal
closeCameraButton.addEventListener('click', () => {
    stopCameraPreview();
    cameraModal.style.display = 'none';
});

// Send button click event
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();

    if (message === '' && !videoStream) {
        return; // Don't send empty messages without image
    }

    const messageElement = document.createElement('div');
    messageElement.className = videoStream ? 'message user with-image' : 'message user';

    if (videoStream) {
        const imgElement = document.createElement('img');
        imgElement.src = videoPreview.src;
        messageElement.appendChild(imgElement);
        stopCameraPreview();
        videoStream = null;
    }

    const textElement = document.createElement('p');
    textElement.textContent = message;
    messageElement.appendChild(textElement);

    chatArea.appendChild(messageElement);

    // Generate and add chatbot response
    if (message !== '') {
        const botResponseElement = document.createElement('div');
        botResponseElement.className = 'message bot';

        const botTextElement = document.createElement('p');
        botTextElement.textContent = generateMotivationalResponse();
        botResponseElement.appendChild(botTextElement);

        chatArea.appendChild(botResponseElement);
    }

    // Clear input fields
    messageInput.value = '';
    scrollToBottom();
});

// Start camera preview in modal
function startCameraPreview() {
    cameraPreview.srcObject = videoStream;
    cameraPreview.play();
}

// Stop camera preview and release camera resources
function stopCameraPreview() {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        cameraPreview.srcObject = null;
    }
}

// Capture a frame from video
function captureFrame(video) {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
}

// Send a message with an image
function sendMessageWithImage(imageData) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user with-image';

    const imgElement = document.createElement('img');
    imgElement.src = imageData;
    messageElement.appendChild(imgElement);

    chatArea.appendChild(messageElement);
    scrollToBottom();
}

// Scroll chat area to the bottom
function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Generate random motivational response
function generateMotivationalResponse() {
    const responses = [
        "You're doing great! Keep up the good work!",
        "Remember, every small step counts towards your goal.",
        "Believe in yourself and your journey to a healthier lifestyle.",
        "Stay motivated and never give up on your fitness goals!",
        "Your dedication and effort will pay off in the long run.",
        "Embrace challenges as opportunities for growth and progress.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
