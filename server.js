const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser'); // To handle form data

// Middleware to parse JSON and URL-encoded data from requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the unified auth page (login/signup)
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Add real authentication logic here (e.g., checking user credentials in a database)
    if (username === "testUser" && password === "password123") {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Invalid username or password" });
    }
});

// Handle signup form submission
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Add real signup logic here (e.g., saving new user to a database)
    if (username && password) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Signup failed. Please try again." });
    }
});

// Serve the main page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
