const Movie = require("../models/movie");

/**
 * Controller function to create a new movie
 * @route POST /movies
 * @returns {Object} movie created
 */
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    return res.status(201).json({
      success: true,
      error: {},
      data: movie,
      message: "Successfully created a new movie",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: { message: error.message },
      data: {},
      message: "Something went wrong while creating the movie",
    });
  }
};

const deleteMovie = async(req,res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
  createMovie,
  deleteMovie
};
