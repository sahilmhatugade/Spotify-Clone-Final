const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser'); // JSON
const mongoose = require('mongoose');  // to connect mongodb schema
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = 5000;
const DB_URI = 'mongodb://localhost:27017/project4'; //mongodb compass


app.use(cors());
app.use(bodyParser.json()); //JSON

mongoose.connect(DB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/', authRoutes);



// Middleware to handle CORS in the backend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");  // Allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Your API route to act as a proxy
app.get('/proxy', async (req, res) => {
  const { q, offset } = req.query;
  try {
    const apiUrl = `https://audius.co/api/v1/search/tracks?q=${q}&offset=${offset}&limit=20`;
    const apiResponse = await fetch(apiUrl);
    const apiData = await apiResponse.json();

    if (apiData && apiData.data) {
      res.json(apiData); // Return the data from the external API
    } else {
      res.status(500).json({ message: "No data found." });
    }
  } catch (error) {
    console.error("Error fetching music data:", error);
    res.status(500).json({ message: "Error fetching music data." });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
