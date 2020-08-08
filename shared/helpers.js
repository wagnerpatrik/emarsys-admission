const { DESTINATION_DEPENDENCY_SEPARATOR, SPACE_RE } = require('./constants.js');

const sanitiser = (input) => {
  const trimmedInput = input.replace(SPACE_RE, '');

  if (trimmedInput.length > 4) {
    throw Error(
      `Invalid input. Please enter space separated letters, with or without a "fat arrow"`,
    );
  } else if (
    (trimmedInput.length === 1 || trimmedInput.length === 2) &&
    !input.match(new RegExp(DESTINATION_DEPENDENCY_SEPARATOR))
  ) {
    return `${trimmedInput[0]}${DESTINATION_DEPENDENCY_SEPARATOR}${
      trimmedInput[1] ? trimmedInput[1] : ''
    }`;
  }
  return trimmedInput;
};

module.exports = transformInput = (destination) =>
  sanitiser(destination)
    .split(DESTINATION_DEPENDENCY_SEPARATOR)
    .map((part = '') => part.trim());
