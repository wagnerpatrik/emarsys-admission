const transformInput = require('../shared/helpers.js');

const routeReducer = (optimalRoute, [destination, desDependency]) => {
  const desDependencyIndex = optimalRoute.findIndex((des) => des === desDependency);
  const destinationIndex = optimalRoute.findIndex((route) => route === destination);

  if (desDependency && desDependencyIndex === -1) {
    optimalRoute.push(desDependency);
  }

  if (destinationIndex === -1) {
    optimalRoute.push(destination);
  } else if (!!desDependency) {
    optimalRoute.splice(desDependencyIndex, 1);
    optimalRoute.splice(destinationIndex, 0, desDependency);
  }

  return optimalRoute;
};

module.exports = generateRoute = (destinations) =>
  (destinations || []).map(transformInput).reduce(routeReducer, []).join('');


const userInput = process.argv.slice(2);
userInput && console.log(generateRoute(userInput));
