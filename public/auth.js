// Get references to the forms and toggle links
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const toggleToSignup = document.getElementById('toggle-to-signup');
const toggleToLogin = document.getElementById('toggle-to-login');
const formHeader = document.getElementById('form-header');

// Add event listener to toggle to signup form
toggleToSignup.addEventListener('click', function (e) {
    e.preventDefault();
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    formHeader.textContent = "Sign Up"; // Change header to "Sign Up"
});

// Add event listener to toggle to login form
toggleToLogin.addEventListener('click', function (e) {
    e.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    formHeader.textContent = "Login"; // Change header to "Login"
});

// Handle login form submission
loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Send login data to the server (adjust server route accordingly)
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (result.success) {
        alert('Login successful');
        window.location.href = 'index.html'; // Redirect to main page
    } else {
        alert(result.message);
    }
});

// Handle signup form submission
signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const passwordConfirm = document.getElementById('signup-password-confirm').value.trim();

    if (password !== passwordConfirm) {
        alert('Passwords do not match');
        return;
    }

    // Send signup data to the server (adjust server route accordingly)
    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (result.success) {
        alert('Signup successful, please login');
        window.location.href = 'auth.html'; // Redirect to login/signup page
    } else {
        alert(result.message);
    }
});
