const { DESTINATION_DEPENDENCY_SEPARATOR, SPACE_RE } = require('./constants.js');

const validateInput = (input) => {
  const trimmedInput = input.replace(SPACE_RE, '').replace(DESTINATION_DEPENDENCY_SEPARATOR, '');

  if (trimmedInput.length > 2) {
    throw Error(`Invalid input. Please enter two letters, with or without a "fat arrow"`);
  }
  return `${trimmedInput[0]}${trimmedInput[1] ? trimmedInput[1] : ''}`;
};

module.exports = transformInput = (destination) => validateInput(destination).split('');
