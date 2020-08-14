const { transformInput, routeReducer } = require('../shared/helpers');

const generateRoute = (destinations) =>
  (destinations || [])
    .map(transformInput)
    .reduce(routeReducer, [])
    .join('');


const userInput = process.argv.slice(2);
userInput && console.log(generateRoute(userInput));

module.exports = generateRoute;
