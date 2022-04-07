const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegistration = (data) => {
  let errors = {};

  if (isEmpty(data.name)) {
    errors.name = "Please input your name";
  } else if (!Validator.isLength(data.name, { min: 3, max: 26 })) {
    errors.name = "name must be between 3 and 26 characters.";
  }

  if (isEmpty(data.email)) {
    errors.email = "Email field cannot be empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid, provide a valid Email.";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password field cannot be empty";
  } else if (!Validator.isLength(data.password, { min: 6, max: 26 })) {
    errors.password = "Password must be between 6 and 26 characters.";
  }

  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Please confirm your password";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.password = "Passwords must match.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegistration;
