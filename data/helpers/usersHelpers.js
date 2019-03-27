const db = require("../dbconfig");

module.exports = {
  getUserByName,
  addUser,
  getAllUsers
};

function getUserByName(username) {
  console.log(username);
  return db("users")
    .where(username) //{ username: 'user2' }
    .first();
}

function getAllUsers() {
  return db("users");
}

function addUser(user) {
  return db.insert(user).into("users");
}
