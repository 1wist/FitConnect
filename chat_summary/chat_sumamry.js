document.addEventListener('DOMContentLoaded', () => {
    const chatList = document.getElementById('chatList');

    // Dummy chat data (replace with actual data from backend)
    const chats = [
        { name: 'Team FitConnect', profilePic: '../nabar/navbar_media/fitconnect_logo.png', lastMessage: 'You are on a roll!' },
        { name: 'AA2303', profilePic: '../chat_summary/pfp_media/class_pfp.jpg', lastMessage: 'You: 📷 Photo' },
        { name: 'Jovy', profilePic: '../chat_summary/pfp_media/jovy_pfp.jpg', lastMessage: 'yes' },
        { name: 'Jun Song', profilePic: '../chat_summary/pfp_media/js_pfp.jpg', lastMessage: 'Hey there!' },
        { name: 'ginger', profilePic: '../chat_summary/pfp_media/ginger_pfp.jpg', lastMessage: '🐦' },
        { name: 'Ashley', profilePic: '../chat_summary/pfp_media/ash_pfp.jpg', lastMessage: 'omg' },
        { name: 'Gabriel', profilePic: '../chat_summary/pfp_media/gab_pfp.jpg', lastMessage: 'Morning' },
        { name: 'Cycling Lads', profilePic: '../chat_summary/pfp_media/gc_pfp.jpg', lastMessage: 'Jun Song: Great time guys. Another one?' },
        { name: 'Augustus', profilePic: '../chat_summary/pfp_media/aug_pfp.jpg', lastMessage: '🐈' },
        { name: 'Sarah', profilePic: '../chat_summary/pfp_media/sarah_pfp.jpg', lastMessage: ':0' },
        { name: 'Bing Rui', profilePic: '../chat_summary/pfp_media/bingrui_pfp.jpg', lastMessage: 'does everyone know change meeting location?' },

        // Add more chat objects here
    ];

    // Populate chat summary list
    chats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.classList.add('chat-item');
        chatItem.innerHTML = `
            <img src="${chat.profilePic}" alt="${chat.name}">
            <div class="chat-details">
                <div class="chat-name">${chat.name}</div>
                <div class="last-message">${chat.lastMessage}</div>
            </div>
        `;
        chatList.appendChild(chatItem);
    });

    // Handle chat item click
    chatList.addEventListener('click', (event) => {
        const chatItem = event.target.closest('.chat-item');
        if (chatItem) {
            window.location.href = `../community_chat/community_chat.html`;
        }
    });
});
