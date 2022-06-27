const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateTodoInput = (data) => {
  let errors = {};

  if (isEmpty(data.content)) {
    errors.content = "cannot be empty, please add an Item.";
  } else if (!Validator.isLength(data.content, { min: 1, max: 300 })) {
    errors.content = "characters must be between 1 and 300";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateTodoInput;
