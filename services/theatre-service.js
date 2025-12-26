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

const deleteTheatre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if (!response) {
      return {
        error: "No record of a theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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

const getAllTheatres = async (data) => {
  try {
    let query = {};
    if (data && data.city) {
      // this checks whether city is present in query params or not
      query.city = data.city;
    }
    if (data && data.pincode) {
      // this checks whether pincode is present in query params or not
      query.pincode = data.pincode;
    }

    if (data && data.name) {
      //checks whether name is present in query params or not
      query.name = data.name;
    }
    const response = await Theatre.find(query);
    console.log(response);
    if (!response || response.length === 0) {
      return {
        error: "No record of a theatre found for the given filter",
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
  getAllTheatres,
};
