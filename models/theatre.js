const mongoose = require("mongoose");

/**
 * Defines the schema of theatre resource to be stored on the DB
 */

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLegth: 3,
    },
    description: String,
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    address: String,
    movies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Movie",
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
