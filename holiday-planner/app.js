const transformInput = require('../shared/helpers.js');

const routeReducer = (optimalRoute, [destination, desDependency]) => {
  let desDependencyIndex = optimalRoute.findIndex((des) => des === desDependency);
  const destinationIndex = optimalRoute.findIndex((route) => route === destination);

  if (desDependency && desDependencyIndex === -1) {
    optimalRoute.push(desDependency);
    desDependencyIndex = optimalRoute.findIndex((des) => des === desDependency);
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

const userInput = process.argv.slice(2);
userInput && console.log(generateRoute(userInput));

module.exports = generateRoute;
