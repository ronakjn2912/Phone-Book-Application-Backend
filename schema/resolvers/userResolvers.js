const UserInputError = require("../../errors/UserInputError");
const { User } = require("../../model/associations");
const { REGEX } = require("../../constants");
const bcrypt = require("bcrypt");
const Unauthenticated = require("../../errors/Unauthenticated");
const registerUserResolver = async (_, { username, email, password }) => {
  if (!username || !email || !password) {
    const invalidArgs = [];
    if (!username) invalidArgs.push("username");
    if (!email) invalidArgs.push("email");
    if (!password) invalidArgs.push("password");
    throw new UserInputError("All fields are mandatory", { invalidArgs });
  }
  if (!REGEX.PASSWORD.test(password)) {
    throw new UserInputError("Doesn't match password pattern", {
      invalidArgs: "password",
    });
  }
  const checkUser = await User.findOne({ where: { email: email } });
  if (checkUser) {
    throw new UserInputError("User already registered with this email", {
      invalidArgs: "email",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  return {
    success: true,
    message: "User created",
    User: {
      username: user.username,
      email: user.email,
      id: user.id,
    },
  };
};

const loginUserResolver = async (_, { username, password }) => {
  if (!username || !password) {
    const invalidArgs = [];
    if (!username) invalidArgs.push("username");
    if (!password) invalidArgs.push("password");
    throw new UserInputError("All fields are mandatory", {
      invalidArgs: invalidArgs,
    });
  }

  const user = await User.findOne({ where: { username: username } });
  console.log(user)
  if (user && (await bcrypt.compare(password, user.password))) {
    // const accessToken = jwt.sign(
    //   {
    //     user: {
    //       username: user.username,
    //       email: user.email,
    //       id: user.id,
    //     },
    //   },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1d" }
    // );
    return {
      success: true,
      message: "User logged in",
      User: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
      // accessToken: accessToken,
    };
  }
  throw new Unauthenticated("Invalid credentials");
};

module.exports = { registerUserResolver, loginUserResolver };
