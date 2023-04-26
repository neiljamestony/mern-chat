const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.json({ status: 400, msg: `Please fill out all the fields` });
  }

  if (!name) res.json({ status: 400, msg: `${name} is required!` });
  if (!email) res.json({ status: 400, msg: `${name} is required!` });
  if (!password) res.json({ status: 400, msg: `${password} is required!` });

  // check if user exist
  const exists = await User.find({ email });
  if (exists.length) res.json({ status: 300, msg: "user exists!" });

  // hash password
  const salt = await bcrypt.genSalt(20);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });
  res.json({
    name: user.name,
    email: user.email,
    profile: user.profile,
    _id: user._id,
    token: generateToken(user.id),
    status: 200,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      name: user.name,
      email: user.email,
      profile: user.profile,
      _id: user._id,
      token: generateToken(user._id),
      status: 200,
    });
  } else {
    res.json({
      status: 400,
      msg: "Invalid Credentials",
    });
  }
});

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

module.exports = { register, login };
