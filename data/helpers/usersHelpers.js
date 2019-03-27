const db = require("../dbconfig");

module.exports = {
  getUserByName,
  addUser,
  getAllUsers
};

function getUserByName(username) {
  return db("users")
    .where({ username })
    .first();
}

function getAllUsers() {
  return db("users");
}

function addUser(user) {
  return db.insert(user).into("users");
}
