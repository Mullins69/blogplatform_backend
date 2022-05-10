const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUser } = require("../middleware/finders");

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET  that one user thats logged in
router.get("/oneuser/", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get one user by id
router.get("/oneuser/:id", [auth,getUser], async (req, res, next) => {
  res.send(res.user)
});


// LOGIN user with email + password
router.patch("/", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "Could not find user" });
  }
  if (await bcrypt.compare(password, user.password)) {
    try {
      const access_token = jwt.sign(
        JSON.stringify(user),
        process.env.JWT_SECRET_KEY
      );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.send(error);
    }
  } else {
    res
      .status(400)
      .json({ message: "Email and password combination do not match" });
  }
});

// REGISTER a user
router.post("/", async (req, res, next) => {
  const {
    fullname,
    email,
    password,
    role
  } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    fullname,
    email,
    role,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();

    try {
      const access_token = jwt.sign(
        JSON.stringify(newUser),
        process.env.JWT_SECRET_KEY
      );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Editing a user
router.put("/", auth, async (req, res, next) => {
  // Get user from DB using Schema
  const user = await User.findById(req.user._id);

  // Get info needed to update user
  const { fullname, password , role} =
    req.body;

  // Set information
  if (fullname) user.fullname = fullname;
  if (role) user.role = role;
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
  }

  try {
    const updatedUser = await user.save();

    try {
      const access_token = jwt.sign(
        JSON.stringify(updatedUser),
        process.env.JWT_SECRET_KEY
      );
      res.status(201).json({ jwt: access_token, user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    // Dont just send user as object, create a JWT and send that too.
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Editing a user via id
router.put("/admin/:id", [auth, getUser], async (req, res, next) => {
  // Get user from DB using Schema
  const user = await User.findById(res.user);

  // Get info needed to update user
  const { fullname, password, role} =
    req.body;

  // Set information
  if (fullname) user.fullname = fullname;
  if (role) user.role = role;
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
  }

  try {
    const updatedUser = await user.save();

    try {
      const access_token = jwt.sign(
        JSON.stringify(updatedUser),
        process.env.JWT_SECRET_KEY
      );
      res.status(201).json({ jwt: access_token, user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    // Dont just send user as object, create a JWT and send that too.
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a user
router.delete("/", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    await user.remove();
    res.json({ message: "Deleted user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router
