/**
 * Movie Request Validation Middleware
 */

const validateCreateMovieRequest = (req, res, next) => {
  const {
    name,
    description,
    casts,
    trailerURL,
    releaseDate,
    language,
    director,
    releaseStatus,
  } = req.body;

  // 1️⃣ Required fields
  if (!name || !description || !trailerURL || !releaseDate) {
    return res.status(400).json({
      success: false,
      message:
        "name, description, trailerURL, and releaseDate are required fields",
    });
  }

  // 2️⃣ Type validations
  if (casts && !Array.isArray(casts)) {
    return res.status(400).json({
      success: false,
      message: "casts must be an array of strings",
    });
  }

  // 3️⃣ Date validation
  if (isNaN(Date.parse(releaseDate))) {
    return res.status(400).json({
      success: false,
      message: "releaseDate must be a valid date",
    });
  }

  // 4️⃣ URL validation
  try {
    new URL(trailerURL);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "trailerURL must be a valid URL",
    });
  }

  // 5️⃣ Enum validation (optional but recommended)
  const validReleaseStatus = ["UPCOMING", "RELEASED", "BLOCKED"];
  if (releaseStatus && !validReleaseStatus.includes(releaseStatus)) {
    return res.status(400).json({
      success: false,
      message: `releaseStatus must be one of ${validReleaseStatus.join(", ")}`,
    });
  }

  next();
};

/**
 * Validate Movie ID in params
 */
const validateMovieIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!id || id.length !== 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid movie ID",
    });
  }

  next();
};

/**
 * Validate Update Movie Request
 */
const validateUpdateMovieRequest = (req, res, next) => {
  const { trailerURL, releaseDate, casts } = req.body;

  if (trailerURL) {
    try {
      new URL(trailerURL);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "trailerURL must be a valid URL",
      });
    }
  }

  if (releaseDate && isNaN(Date.parse(releaseDate))) {
    return res.status(400).json({
      success: false,
      message: "releaseDate must be a valid date",
    });
  }

  if (casts && !Array.isArray(casts)) {
    return res.status(400).json({
      success: false,
      message: "casts must be an array",
    });
  }

  next();
};

module.exports = {
  validateCreateMovieRequest,
  validateUpdateMovieRequest,
  validateMovieIdParam,
};
