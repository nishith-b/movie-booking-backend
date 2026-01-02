const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const { USER_ROLE, USER_STATUS } = require("../utils/constants");

/**
 * Create a new user
 *
 * @param data --> Object containing user details
 * @returns --> Returns the created user object
 */
const createUser = async (data) => {
  try {
    // If role is CUSTOMER or not provided
    if (!data.userRole || data.userRole === USER_ROLE.customer) {
      if (data.userStatus && data.userStatus !== USER_STATUS.approved) {
        throw {
          err: "We cannot set any other status for customer",
          code: StatusCodes.BAD_REQUEST,
        };
      }
    }

    // If role exists and is NOT CUSTOMER
    if (data.userRole && data.userRole !== USER_ROLE.customer) {
      data.userStatus = USER_STATUS.pending;
    }

    const response = await User.create(data);
    return response;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    throw error;
  }
};

/**
 * Get a user by email
 *
 * @param email --> User email
 * @returns --> Returns the user object
 */
const getUserByEmail = async (email) => {
  try {
    const response = await User.findOne({ email: email });
    if (!response) {
      throw {
        err: "No user found for the given email",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Get a user by ID
 *
 * @param id --> User ID
 * @returns --> Returns the user object
 */
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw {
        err: "No user found for the given id",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Update a user's role or status
 *
 * @param data --> Object containing fields to update (userRole, userStatus)
 * @param userId --> User ID to update
 * @returns --> Returns the updated user object
 */
const updateUserRoleOrStatus = async (data, userId) => {
  try {
    const updateQuery = {};

    if (data.userRole) updateQuery.userRole = data.userRole;
    if (data.userStatus) updateQuery.userStatus = data.userStatus;

    if (Object.keys(updateQuery).length === 0) {
      throw {
        err: "No valid fields provided to update",
        code: StatusCodes.BAD_REQUEST,
      };
    }

    const response = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateQuery },
      { new: true, runValidators: true }
    );

    if (!response) {
      throw {
        err: "No user found for the given id",
        code: StatusCodes.NOT_FOUND,
      };
    }

    return response;
  } catch (error) {
    console.error(error);
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw {
        err: err,
        code: StatusCodes.BAD_REQUEST,
      };
    }
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserRoleOrStatus,
};
