const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../models");

// SIGNUP ROUTE
router.post("/api/signup", (request, response) => {
  // Destructuring the request object
  const { username, password } = request.body;
  // Validation
  if (!username.trim() || !password.trim()) {
    response.status(400); // Bad Request
  } else {
    // Hash the password
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        // Create a new user
        db.Users.create({
          username: username,
          password: hashedPassword,
        })
          .then((newUser) => {
            response.json(newUser);
          })
          .catch((error) => {
            console.log(error);
            response.status(500).json({
              error: true,
              data: null,
              message: "Unable to sign up",
            });
          });
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({
          error: true,
          data: null,
          message: "Unable to hash password",
        });
      });
  }
});

// LOGIN ROUTE
router.post("/api/signup", (request, response) => {
  const { username, password } = request.body;
  // Destructuring the request object
  db.User.findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        bcrypt
          .compare(password, foundUser.password)
          .then(function (result) {})
          .catch((error) => {});
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        error: true,
        data: null,
        message: "Unable to hash password",
      });
    });
});

module.exports = router;
