const mongoose = require("mongoose");

/**
 * Movie Schema
 * Represents a movie entity in the database.
 */
const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,      
      minLength: 2,        
    },

    description: {
      type: String,
      required: true,
      minLength: 5,    
    },

    casts: {
      type: [String],
      required: true,
      validate: (v) => v.length > 0, // Must have at least one cast member
    },

    trailerURL: {
      type: String,
      required: true,
      match: /^https?:\/\//, // Must be a valid HTTP/HTTPS URL
    },

    language: {
      type: String,
      default: "English",  // Default to English if not provided
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
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Movie", movieSchema);
