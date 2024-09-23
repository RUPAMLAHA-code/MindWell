// JavaScript code for login functionality

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Send login data to the server
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (result.success) {
        // Redirect to main page or dashboard
        window.location.href = 'index.html';
    } else {
        alert(result.message);
    }
});
