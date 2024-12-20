const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

//signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  // const { haa } = req.body;

  try {
    // return res.status(201).send({ username: username, email: email, password: password });
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).send({ message: "Email already exists!" });
    }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    return res.status(201).send({ user });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

//login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", req.body); // Log request body
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).send({ message: "Invalid Email or Password" });
    }
    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordMatched) {
      return res.status(400).send({ message: "Invalid Password" });
    }
    const jwtToken = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_KEY
    );
    res.cookie("token", jwtToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });

    console.log("Login successful:", existingUser);
    return res.status(200).send({ existingUser, jwtToken });
  } catch (error) {
    console.error("Login error:", error); // Log errors
    return res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};
// login

//logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({ message: "logout successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Error logging out!", error });
  }
};

//mydetails
exports.myDetails = async (req, res) => {
  const userId = req._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    return res.status(200).send({ user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Getting my details!", error });
  }
};
