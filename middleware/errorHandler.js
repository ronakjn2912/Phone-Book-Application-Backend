const { ERROR_CONSTANTS } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  //to handle sequelize validation error
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    return res.status(400).json({
      title: "Validation failed",
      message: "Invalid Input data ",
      errors: err.errors.map((error) => ({
        //errors is 'array of error' in err. each contains object which has details of error like path, message, etc.
        field: error.path,
        message: error.message,
      })),
    });
  }
  switch (statusCode) {
    case ERROR_CONSTANTS.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case ERROR_CONSTANTS.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case ERROR_CONSTANTS.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case ERROR_CONSTANTS.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case ERROR_CONSTANTS.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log(err.message);
  }
};

module.exports = { errorHandler };
