require('dotenv').config();  // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const User = require('./models/User');  // Assuming your User model

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());  // Enable JSON parsing for incoming requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MindWell', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// LLM API Route using the Colab-based model

const router = express.Router();

router.post('/api/query', async (req, res) => {
  try {
    // Validate input
    const userInput = req.body.input;
    if (!userInput) {
      return res.status(400).send({ success: false, message: 'No input provided.' });
    }

    // Perform LLM model interaction
    const response = await axios.post('http://127.0.0.1:11434/api/tags', {
      input: userInput,
    });

    // Convert response data to a more readable format (assuming it's an object)
    if (response.data instanceof Object) {
      const formattedResponse = response.data;
      res.status(200).json({
        response: formattedResponse.response || 'Sorry, something went wrong with the model response.' });
    } 
    else if (typeof response.data === 'string') {
        // Handle string response as a JSON object
        res.status(200).json(response.data);
      } 
    else {
          throw new Error('Invalid response format');
      }
    } 
  catch (error) {
      console.error(error); // Log errors for debugging purposes
      res.status(500).json({ success: false, message: 'Failed to connect to the local LLM server.' });
    }
  });

module.exports = router;
// Handle undefined routes (optional, for SPAs)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/index.html'));
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
