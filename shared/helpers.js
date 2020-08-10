const {
  SPACE_RE,
  INPUT_VALIDATION_ERROR,
  DESTINATION_DEPENDENCY_SEPARATOR,
} = require('./constants');

const validateInput = (input) => {
  const trimmedInput = input.replace(SPACE_RE, '').replace(DESTINATION_DEPENDENCY_SEPARATOR, '');

  if (trimmedInput.length > 2) {
    throw Error(INPUT_VALIDATION_ERROR);
  }
  return `${trimmedInput[0]}${trimmedInput[1] ? trimmedInput[1] : ''}`;
};

module.exports = transformInput = (destination) => validateInput(destination).split('');
