const { User } = require("../models");
const { generateToken } = require("../utils/jwt");
const { hashPassword, comparePassword } = require("../utils/password");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const { username, email, password, type } = req.body;
      if (!username || !email || !password || !type) {
        return res.status(400).json({ message: "All fields are required." });
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use." });
      }
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        type,
      });
      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          type: user.type,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required." });
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      const token = generateToken({ id: user.id, type: user.type });
      return res.status(200).json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          type: user.type,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
