const ERROR_CONSTANTS = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401, // Invalid credentials
  FORBIDDEN: 403, // User valid but denied certain permissions
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const REGEX = {
  PASSWORD: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{5,}$/,
};

module.exports = { ERROR_CONSTANTS, REGEX };
