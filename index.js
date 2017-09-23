/* eslint camelcase: 0 */
/**
 * @fileOverview The starting point of the server.
 */
const route_20170120 = require('./2017-01-20');
const route_20170201 = require('./2017-02-01');
const route_20170320 = require('./2017-03-20');

const server = require('./server')({ '2017-01-20': route_20170120, '2017-02-01': route_20170201, '2017-03-20': route_20170320 });

server.init();
