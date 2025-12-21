const mongoose = require("mongoose");

/**
 * Movie Schema
 */
const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    casts: {
      type: [String],
      required: true,
      validate: (v) => v.length > 0,
    },
    trailerURL: {
      type: String,
      required: true,
      match: /^https?:\/\//,
    },
    language: {
      type: String,
      default: "English",
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    releaseStatus: {
      type: String,
      enum: ["RELEASED", "UPCOMING", "BLOCKED"],
      default: "RELEASED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
