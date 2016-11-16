let fetch = require('node-fetch');

let queryString, 
  uri = 'http://www.cineworld.co.uk/api/quickbook/',
  queryDefault = { key: 'TNk2:R3P' };

let api = (route, query) => {
  queryString = '?';

  query = Object.assign({}, queryDefault, query);
  for(item in query) {
    queryString += `${item}=${query[item]}&`
  }

  return fetch(uri + route + queryString).then(
    response => response.json()
  );
};

module.exports = api;
