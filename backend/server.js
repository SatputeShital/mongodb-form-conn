require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (Compass)
mongoose.connect("mongodb://localhost:27017/myDatabase", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected (Compass)"))
  .catch((err) => console.log(err));

// Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

// API Route: Submit Form Data
app.post("/submit", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving user" });
  }
});

// API Route: Fetch Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
