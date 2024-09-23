// JavaScript code for signup functionality

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();

    // Send sign-up data to the server
    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
    });

    const result = await response.json();

    if (result.success) {
        // Redirect to login page
        alert('Sign-up successful! Please log in.');
        window.location.href = 'login.html';
    } else {
        alert(result.message);
    }
});
