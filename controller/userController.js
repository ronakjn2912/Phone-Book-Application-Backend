const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User } = require("../model/associations");
const { REGEX } = require("../constants");
const jwt = require("jsonwebtoken");
//@desc register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!username && !password && !email) {
    res.status(400);
    throw new Error("Required field is empty");
  }
  if (!REGEX.PASSWORD.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Doesn't match password pattern",
    });
  }

  const checkUser = await User.findOne({ where: { email: email } });
  if (checkUser) {
    res.status(400).json({
      success: false,
      message: "User already registered with this email",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    message: "User created",
    data: user,
    success: true,
  });
});

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ where: { username: username } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign( 
      {
        //payload
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET, //secret key
      { expiresIn: "15m" }
    );

    res.status(200).json({
      success: true,
      message: "User successfully logged-in",
      accessToken: accessToken,
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});
module.exports = { registerUser, loginUser };

// password : Ronak$1
