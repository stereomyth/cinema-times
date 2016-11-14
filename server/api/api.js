let request = require('request');

let api = request.defaults({
  baseUrl: 'http://www.cineworld.co.uk/api/quickbook/',
  json: true,
  qs: {
    key: 'TNk2:R3P'
  }
});

module.exports = api;
