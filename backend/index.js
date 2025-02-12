require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const UserModel = require("./model");
const EventModel = require("./eventModel");

const verifyToken = require("./verifyToken");

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ user: { _id: newUser._id, username, email } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the dashboard!", user: req.user });
});

app.post("/events", verifyToken, async (req, res) => {
  try {
    const { title, date, time } = req.body;
    if (!title || !date || !time)
      return res.status(400).json({ message: "All fields required" });

    const newEvent = await EventModel.create({
      title,
      date,
      time,
      userId: req.user.userId,
    });

    return res.json(newEvent);
  } catch (e) {
    res.send(e.message);
  }
});
app.get("/events", verifyToken, async (req, res) => {
  try {
    const events = await EventModel.find({ userId: req.user.userId });
    res.json(events);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () =>
      console.log(`App running on http://localhost:${port}`)
    );
  })
  .catch((e) => console.error(e));
