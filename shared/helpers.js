const {
  SPACE_RE,
  INPUT_VALIDATION_ERROR,
  DESTINATION_DEPENDENCY_SEPARATOR,
} = require('./constants');

const getIndex = (list) => (item) => list.findIndex((element) => element === item);

const validateInput = (input) => {
  const trimmedInput = input.replace(SPACE_RE, '').replace(DESTINATION_DEPENDENCY_SEPARATOR, '');

  if (trimmedInput.length > 2) {
    throw Error(INPUT_VALIDATION_ERROR);
  }
  return `${trimmedInput[0]}${trimmedInput[1] ? trimmedInput[1] : ''}`;
};

const routeReducer = (optimalRoute, [destination, desDependency]) => {
  const getDestinationIndex = getIndex(optimalRoute);
  let [desDependencyIndex, destinationIndex] = [desDependency, destination].map(
    getDestinationIndex,
  );

  if (desDependency && desDependencyIndex === -1) {
    optimalRoute.push(desDependency);
    desDependencyIndex = getDestinationIndex(desDependency);
  }

  if (destination && destinationIndex === -1) {
    optimalRoute.push(destination);
  } else if (!!desDependency && desDependencyIndex > destinationIndex) {
    optimalRoute.splice(desDependencyIndex, 1);
    optimalRoute.splice(destinationIndex, 0, desDependency);
  }

  return optimalRoute;
};

const transformInput = (destination) => validateInput(destination).split('');

module.exports = { routeReducer, transformInput };
