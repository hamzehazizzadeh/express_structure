const User = require("../../models/User/User");

const usersSeed = require("./users/users.json");

const users = async () => {
  const user = await User.countDocuments();
  if (user === 0) {
    await User.insertMany(usersSeed);
    console.log("Added users.json to MongoDB");
  }
};
module.exports = () => {
  users();
};
