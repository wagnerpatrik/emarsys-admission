const transformInput = require('../shared/helpers');

const userInput = process.argv.slice(2);
const getIndex = (list) => (item) => list.findIndex((element) => element === item);

const routeReducer = (optimalRoute, [destination, desDependency]) => {
  const getDestinationIndex = getIndex(optimalRoute);
  let [desDependencyIndex, destinationIndex] = [desDependency, destination].map(getDestinationIndex);

  if (desDependency && desDependencyIndex === -1) {
    optimalRoute.push(desDependency);
    desDependencyIndex = getDestinationIndex(desDependency);
  }

  if (destinationIndex === -1) {
    optimalRoute.push(destination);
  } else if (!!desDependency && desDependencyIndex > destinationIndex) {
    optimalRoute.splice(desDependencyIndex, 1);
    optimalRoute.splice(destinationIndex, 0, desDependency);
  }

  return optimalRoute;
};

const generateRoute = (destinations) =>
  (destinations || []).map(transformInput).reduce(routeReducer, []).join('');

userInput && console.log(generateRoute(userInput));

module.exports = generateRoute;
