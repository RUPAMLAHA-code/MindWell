document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    const signInButton = document.getElementById('signInButton');
    const profileSection = document.getElementById('profileSection');
    const userNameSpan = document.getElementById('userName');
    const profileIcon = document.querySelector('.profile-icon');
    const profileDropdown = document.getElementById('profileDropdown');

    if (username) {
        signInButton.style.display = 'none';
        profileSection.style.display = 'flex';
        userNameSpan.textContent = username;
    } else {
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

    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('username');
        window.location.reload();
    });

    const chatInput = document.getElementById('chatInput');
    const chatHistory = document.getElementById('chatHistory');
    const sendButton = document.getElementById('sendButton');
    let isResponding = false;

    function updateInputState() {
        chatInput.disabled = isResponding;
        const isEmpty = chatInput.value.trim() === '';
        sendButton.disabled = isResponding || isEmpty;
    }

    chatInput.addEventListener('input', updateInputState);

    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !isResponding && chatInput.value.trim() !== '') {
            e.preventDefault();
            sendMessage();
        }
    });

    sendButton.addEventListener('click', function() {
        if (!isResponding && chatInput.value.trim() !== '') {
            sendMessage();
        }
    });

    async function sendMessage() {
        if (isResponding) return;

        const message = chatInput.value.trim();
        if (message !== '') {
            isResponding = true;
            updateInputState();

            addMessageToHistory('You', message, 'user-bubble');
            chatInput.value = '';
            chatInput.disabled = true;

            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator ai-bubble';
            typingIndicator.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

            const typingContainer = document.createElement('div');
            typingContainer.className = 'chat-message';
            typingContainer.appendChild(typingIndicator);

            chatHistory.appendChild(typingContainer);
            chatHistory.scrollTop = chatHistory.scrollHeight;

            try {
                const response = await fetch('/api/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ input: message })
                });

                const data = await response.json();
                let aiMessage = data.response || 'Sorry, something went wrong with the model response.';

                chatHistory.removeChild(typingContainer);
                addMessageToHistory('Assistant', aiMessage, 'ai-bubble');
            } catch (error) {
                console.error('Error:', error);
                chatHistory.removeChild(typingContainer);
                addMessageToHistory('Assistant', 'Error connecting to the server.', 'ai-bubble');
            }

            isResponding = false;
            chatInput.disabled = false;
            updateInputState();
        }
    }

    function addMessageToHistory(sender, message, bubbleClass) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-bubble ${bubbleClass}`;
        messageElement.textContent = message;

        const container = document.createElement('div');
        container.className = 'chat-message';
        container.appendChild(messageElement);

        chatHistory.appendChild(container);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
});
