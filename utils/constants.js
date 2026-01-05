/**
 * User status constants
 * @enum {string}
 */
const USER_STATUS = {
  approved: "APPROVED", // User account has been approved
  pending: "PENDING", // User account is pending approval
  rejected: "REJECTED", // User account has been rejected
};

/**
 * User role constants
 * @enum {string}
 */
const USER_ROLE = {
  customer: "CUSTOMER", // Regular customer
  admin: "ADMIN", // Admin user with full privileges
  client: "CLIENT", // Client user with limited privileges
};

const BOOKING_STATUS = {
  cancelled: "CANCELLED",
  successfull: "SUCCESSFULL",
  processing: "IN_PROCESS",
};

module.exports = {
  USER_ROLE,
  USER_STATUS,
  BOOKING_STATUS,
};
