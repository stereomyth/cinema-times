let express = require('express');
let router = express.Router();
let moment = require('moment');

let api = require('../api/api.js');
let tiny = require('../couch/promises.js');

let getCinemas = () => {
  return api('cinemas').then(cinemas => {
    cinemas.updated = moment();
    return tiny.insert(cinemas, 'cinemas');
  })
};

router.get('/', function(req, res, next) {

  tiny.get('cinemas').then(cinemas => {
    if (moment(cinemas.updated).add(14, 'days').isBefore(moment())) {
      return getCinemas();
    } else {
      return cinemas;
    }
  }, error => {
    return getCinemas();
  })
  .then(cinemas => { res.send(cinemas.cinemas) })
  .catch(error => { res.send(error) });

});

module.exports = router;
