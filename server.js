/**
 * @fileOverview Testing versioning solution
 */
const express = require('express');
const bodyParser = require('body-parser');

/**
 * Constructor
 * The entry point of ther server functionality. This accepts an object of releases
 * used to update a local variable holding each endpoint.
 * @param {Object} releases - An object holding each release with an updateVersions
 * function pointer to update the local version variable.
 * @param {Function} releases.updateVersions - The function pointer holding the endpoint
 * release data.
 */
module.exports = (releases) => {
  const versions = [];
  const app = express();
  const routers = {};

  /**
   * Compare function to sort array by release timestamp in descending order.
   */
  const compare = (a, b) => b.release - a.release;

  /**
   * The startup function of the application. This function generates endpoints on
   * an expess server based on the passed in object.
   */
  const init = () => {
    // Loop over each release and pass in the versions array to be populated.
    Object.keys(releases).forEach((release) => {
      releases[release].updateVersions(versions);
    });

    // Sort the endpoints by release timestamp in descending order.
    versions.sort(compare);

    // Body-parser middleware to easily access header variables.
    app.use(bodyParser.json());

    // Middleware to extract API-Version header value and use it to reroute the request.
    app.use((req, res, next) => {
      const headerVersion = new Date(req.header('API-Version')).getTime();
      versions.some((version) => {
        if (headerVersion >= version.release) {
          return version.endpoints.some((endpoint) => {
            if (endpoint.url === req.url) {
              req.url = `/${version.release}${req.url}`;
              return true;
            }
          });
        }
      });
      return next('route');
    });

    /**
     * Looping over the populated versions to generate new routers for each
     * and create their endpoints.
    */
    versions.forEach((version) => {
      routers[version.release] = express.Router();
      version.endpoints.forEach((endpoint) => {
        if (endpoint.method === 'GET') {
          routers[version.release].get(endpoint.url, endpoint.func);
        } else if (endpoint.method === 'POST') {
          routers[version.release].post(endpoint.url, endpoint.func);
        } else if (endpoint.method === 'PUT') {
          routers[version.release].put(endpoint.url, endpoint.func);
        } else if (endpoint.method === 'DELETE') {
          routers[version.release].delete(endpoint.url, endpoint.func);
        }
      });
      app.use(`/${version.release}`, routers[version.release]);
    });

    // Start the server
    app.listen(3000);
    console.log('Server listening on port 3000');
  };

  return { init };
};
