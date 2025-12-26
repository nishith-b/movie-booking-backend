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

const deleteTheatre = async () => {};

/**
 *
 * @param id  -> id is the unique id based on which we will fetch a theatre
 */
const getTheatre = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
      // no record found for the given id
      return {
        error: "No Theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


module.exports = {
  createTheatre,
  deleteTheatre,
  getTheatre,
};
