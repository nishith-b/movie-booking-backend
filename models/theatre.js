const mongoose = require("mongoose");

/**
 * Defines the schema of theatre resource to be stored on the DB
 */

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },

    // hidden normalized key (used only for uniqueness)
    nameKey: {
      type: String,
      required: true,
      select: false,
    },

    description: String,

    city: {
      type: String,
      required: true,
    },

    // hidden normalized key (used only for uniqueness)
    cityKey: {
      type: String,
      required: true,
      select: false,
    },

    pincode: {
      type: Number,
      required: true,
    },

    address: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Movie",
    },
  },
  { timestamps: true }
);

/**
 * Automatically generate normalized keys
 */
theatreSchema.pre("validate", async function () {
  this.nameKey = this.name.trim().toLowerCase();
  this.cityKey = this.city.trim().toLowerCase();
});

/**
 * Composite unique index (case-insensitive)
 */
theatreSchema.index({ nameKey: 1, cityKey: 1, pincode: 1 }, { unique: true });

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
