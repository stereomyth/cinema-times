let nano = require('nano')('http://localhost:5984');

let db = nano.db.use('cineworld-one');

// ========
// Just some promise wrappers around the basic Nano functions
// ========

let tiny = {

  get: (doc) => {
    return new Promise ((resolve, reject) => {

      db.get(doc, (err, body) => {
        if (!err) {
          resolve(body);
        } else {
          reject(err);
        }
      });

    });
  },

  insert: (doc, name) => {
    return new Promise ((resolve, reject) => {

      db.insert(doc, name, (err, body) => {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      });
    
    });
  },

  view: (doc, view, params = {}) => {
    return new Promise ((resolve, reject) => {

      db.view(doc, view, params, function (err, body, headers) {
        if (!err) {
          resolve(body);
        } else {
          reject(err);
        }
      });

    });
  }

};

module.exports = tiny;
