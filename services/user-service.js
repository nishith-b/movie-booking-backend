const User = require("../models/user");

const createUser = async (data) => {
  try {
    console.log("Inside Services");
    const response = await User.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createUser,
};
