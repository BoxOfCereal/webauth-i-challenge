const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../data/helpers/usersHelpers"); //connection

router.get("/users", (req, res) => {
  Users.getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => res.status(500).json({ error: error }));
});

router.post("/register", (req, res) => {
  let user = req.body;
  //  hash the password
  const salt = 10;
  const hash = bcrypt.hashSync(user.password, salt);
  //replace password with hash
  user.password = hash;

  Users.addUser(user)
    .then(([count]) => {
      res.status(201).json(count);
    })
    .catch(error => res.status(500).json({ error: error }));
});

module.exports = router;
