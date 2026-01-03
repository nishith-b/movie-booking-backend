const mongoose = require("mongoose");
const Theatre = require("../models/theatre");

const DBConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    // Enable debug logs only in development
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }

    // Sync indexes safely (dev / test only)
    if (process.env.NODE_ENV !== "production") {
      await Theatre.syncIndexes();
    }

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Fail fast
  }
};

module.exports = DBConnect;
