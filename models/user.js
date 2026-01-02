const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { USER_ROLE, USER_STATUS } = require("../utils/constants");

/**
 * Defines the schema of user resource to be stored on the DB
 */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    userRole: {
      type: String,
      required: true,
      enum: {
        values: [USER_ROLE.admin, USER_ROLE.client, USER_ROLE.customer],
        message: "Invalid user role given",
      },
      default: USER_ROLE.customer,
    },
    userStatus: {
      type: String,
      required: true,
      enum: {
        values: [
          USER_STATUS.approved,
          USER_STATUS.pending,
          USER_STATUS.rejected,
        ],
        message: "Invalid status for user given",
      },
      default: USER_STATUS.approved,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Encrypt password before saving
  if (!this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

/**
 * This is going to be an instance method for user, to compare a password with the stored
 * encrypted password
 * @param plainPassword --> input password given by user in signin request
 * @returns boolean denoting whether passwords are same or not ?
 */
userSchema.methods.isValidPassword = async function (plainPassword) {
  const compare = await bcrypt.compare(plainPassword, this.password);
  return compare;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
