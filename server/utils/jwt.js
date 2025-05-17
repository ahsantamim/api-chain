const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  },
};
