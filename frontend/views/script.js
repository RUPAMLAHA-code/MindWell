document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    const authSection = document.getElementById('authSection');
    const signInButton = document.getElementById('signInButton');
    const profileSection = document.getElementById('profileSection');
    const userNameSpan = document.getElementById('userName');
    const profileIcon = document.querySelector('.profile-icon');
    const profileDropdown = document.getElementById('profileDropdown');

    if (username) {
        // User is logged in
        signInButton.style.display = 'none';
        profileSection.style.display = 'flex';
        userNameSpan.textContent = username;
    } else {
        // User is not logged in
        signInButton.style.display = 'block';
        profileSection.style.display = 'none';
    }

    profileIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!profileDropdown.contains(e.target) && !profileIcon.contains(e.target)) {
            profileDropdown.classList.remove('show');
        }
    });

    // Logout functionality
    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('username');
        window.location.reload();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    const authSection = document.getElementById('authSection');
    const signInButton = document.getElementById('signInButton');
    const profileSection = document.getElementById('profileSection');
    const profileImage = document.getElementById('profileImage');
    const logoutSection = document.getElementById('logoutSection');
    const userGreeting = document.getElementById('userGreeting');

    if (username) {
        // User is logged in
        signInButton.style.display = 'none';
        profileSection.style.display = 'block';
        logoutSection.style.display = 'block';
        userGreeting.textContent = `Hello, ${username}`;
        
        // Set profile image
        profileImage.src = `https://api.dicebear.com/6.x/initials/svg?seed=${username}`;
    } else {
        // User is not logged in
        signInButton.style.display = 'block';
        profileSection.style.display = 'none';
        logoutSection.style.display = 'none';
        userGreeting.textContent = '';
    }

    // Handle log out
    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('username');
        window.location.reload();
    });
}); 
const chatInput = document.getElementById('chatInput');
const chatHistory = document.getElementById('chatHistory');
const sendButton = document.getElementById('sendButton');
const modeToggle = document.getElementById('modeToggle');
const modeIcon = document.getElementById('modeIcon');
const settingsToggle = document.getElementById('settingsToggle');
const toggleButtons = document.getElementById('toggleButtons');
const buttonContainer = document.querySelector('.button-container');
let isResponding = false;
let wordCount = 0;

function getGreeting() {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) {
        return "Good morning";
    } else if (hours < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

const greetingElement = document.getElementById('greeting');
greetingElement.textContent = getGreeting();

function updateInputState() {
    chatInput.disabled = isResponding;
    const isEmpty = chatInput.value.trim() === '';
    sendButton.disabled = isResponding || isEmpty;
    sendButton.classList.toggle('disabled', isResponding || isEmpty);
}

chatInput.addEventListener('input', updateInputState);

chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !isResponding && chatInput.value.trim() !== '') {
        e.preventDefault();
        sendMessage();
    }
});

sendButton.addEventListener('click', function () {
    if (!isResponding && chatInput.value.trim() !== '') {
        sendMessage();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username'); // Check if user is logged in
    if (username) {
        // Display username and log-out button
        document.getElementById('userGreeting').textContent = `Hello, ${username}`;
        document.getElementById('logoutSection').style.display = 'block';

        // Handle log out
        document.getElementById('logoutButton').addEventListener('click', function() {
            localStorage.clear(); // Clear session
            window.location.href = 'login.html'; // Redirect to login
        });
    }
});
function sendMessage() {
    if (isResponding) return;

    const message = chatInput.value.trim();
    if (message !== '') {
        isResponding = true;
        updateInputState();

        addMessageToHistory('User', message, 'user-bubble');
        chatInput.value = '';
        chatInput.disabled = true;

        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator ai-bubble text-appear';
        typingIndicator.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

        const typingContainer = document.createElement('div');
        typingContainer.className = 'chat-message';
        typingContainer.appendChild(typingIndicator);

        chatHistory.appendChild(typingContainer);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        setTimeout(() => {
            // Remove typing indicator
            chatHistory.removeChild(typingContainer);

            addMessageToHistory('AI', `I received your message: "${message}". How can I assist you further?`, 'ai-bubble', true);
            isResponding = false;
            chatInput.disabled = false;
            updateInputState();
        }, 2000);
    }
}

function addMessageToHistory(sender, message, bubbleClass, animate = false) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-bubble ${bubbleClass} ${animate ? 'text-appear' : ''}`;
    messageElement.textContent = `${message}`;

    const container = document.createElement('div');
    container.className = 'chat-message';
    container.appendChild(messageElement);

    chatHistory.appendChild(container);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    wordCount += message.split(' ').length;
    if (wordCount > 600) {
        chatHistory.classList.add('overflow-y-auto');
    }
}

// Event listener for mode toggle
modeToggle.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
    } else {
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }
});

isResponding = false;
updateInputState();