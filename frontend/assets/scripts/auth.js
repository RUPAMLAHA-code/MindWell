document.addEventListener('DOMContentLoaded', () => {
    // Get references to the signup and login forms
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    // Handle Signup Form Submission
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();  // Prevent the default form submission behavior
            
            // Get user inputs
            const email = document.querySelector('input[name="email"]').value;
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Check if passwords match
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Attempt to sign up the user
            try {
                const response = await fetch('http://localhost:3000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();
                
                if (result.success) {
                    alert(result.message);
                    // Redirect to login page after successful signup
                    window.location.href = '/views/login.html';
                } else {
                    alert("Signup failed: " + result.message);
                }
            } catch (error) {
                alert("An error occurred: " + error.message);
            }
        });
    }

    // Handle Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();  // Prevent the default form submission behavior
            
            // Get user inputs
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Attempt to log in the user
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();
                
                if (result.success) {
                    alert(result.message);
                    console.log("Redirecting to index.html");  // Log for debugging purposes

                    // Redirect to index.html on successful login
                    window.location.href = '/views/index.html';
                } else {
                    alert("Login failed: " + result.message);
                }
            } catch (error) {
                alert("An error occurred: " + error.message);
            }
        });
    }
});
