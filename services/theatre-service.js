const Theatre = require("../models/theatre");

const createTheatre = async (data) => {
  try {
    const response = await Theatre.create(data);
    return response;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { error: err, code: 422 };
    }
    console.log(error);
    throw error;
  }
};

module.exports = {
  createTheatre,
};
