const Theatre = require("../models/theatre");

const createTheatre = async (data) => {
  try {
    const response = await Theatre.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createTheatre,
};
