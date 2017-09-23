/**
 * @fileOverview This is the interface for the routes.
 */
const routes = require('./routes')();

module.exports = { updateVersions: routes.updateVersions };
