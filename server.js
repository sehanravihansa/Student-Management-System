const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
 
// Set the port
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(express.json()); // Use built-in body parser

// MongoDB connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongodb connection success!");
}).catch(err => {
    console.error("Mongodb connection failed:", err);
});

const studentRouter = require("./routes/students.js");
app.use("/student",studentRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});
