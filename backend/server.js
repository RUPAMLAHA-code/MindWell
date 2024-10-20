// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const User = require('./models/User');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MindWell', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Serve Static Files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes for Signup and Login
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).send({ success: true, message: "Signup successful!" });
    } catch (error) {
        res.status(400).send({ success: false, message: "Signup failed: " + error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.send({ success: true, message: "Login successful!" });
        } else {
            res.status(400).send({ success: false, message: "Invalid email or password." });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: "An error occurred: " + error.message });
    }
});

// Handle undefined routes (optional, for SPAs)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/index.html'));
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
