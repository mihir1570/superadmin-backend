require('dotenv').config(); // Load environment variables from .env file

const mongoose = require("mongoose");

// Access environment variables
const mongoUrl = process.env.MONGO_URL;

// Connect to MongoDB using the environment variable
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
