// jwtUtil.js

"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");

function generateToken() {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    sub: "1234567890",
    name: "John Doe",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 saat
  };

  return jwt.sign({ header, payload }, SECRET_KEY);
}

module.exports = {
  generateToken,
};
