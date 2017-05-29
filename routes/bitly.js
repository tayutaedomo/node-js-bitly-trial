'use strict';

var debug = require('debug')('node-js-bitly-trial:routes:bitly');

var express = require('express');
var router = express.Router();

var beautify = require('js-beautify').js_beautify;
var Bitly = require('bitly');


function create_bitly() {
  return new Bitly(process.env.BITLY_ACCESS_TOKEN)
}

router.get('/shorten', function(req, res, next) {
  res.render('bitly/shorten', {
    title: 'Shorten API',
    data: {}
  });
});

router.post('/shorten', function(req, res, next) {
  var bitly = create_bitly();

  bitly.shorten(req.body.url).then(function(result) {
    debug('shorten', result);

    res.render('bitly/shorten', {
      title: 'Shorten API',
      data: {
        result: result,
        resultStr: beautify(JSON.stringify(result), { indent_size: 2 })
      }
    });

  }).catch(function(reason) {
    res.render('bitly/shorten', {
      title: 'Shorten API',
      data: {
        error: reason,
        errorStr: beautify(JSON.stringify(reason), { indent_size: 2 })
      }
    });
  });
});

router.get('/expand', function(req, res, next) {
  res.render('bitly/expand', {
    title: 'Expand API',
    data: {}
  });
});

router.post('/expand', function(req, res, next) {
  var bitly = create_bitly();

  bitly.expand([req.body.url]).then(function(result) {
    res.render('bitly/expand', {
      title: 'Expand API',
      data: {
        result: result,
        resultStr: beautify(JSON.stringify(result), { indent_size: 2 })
      }
    });

  }).catch(function(reason) {
    res.render('bitly/expand', {
      title: 'Expand API',
      data: {
        error: reason,
        errorStr: beautify(JSON.stringify(reason), { indent_size: 2 })
      }
    });
  });
});

router.get('/lookup', function(req, res, next) {
  res.render('bitly/lookup', {
    title: 'Lookup API',
    data: {}
  });
});

router.post('/lookup', function(req, res, next) {
  var bitly = create_bitly();

  bitly.lookup([req.body.url]).then(function(result) {
    res.render('bitly/lookup', {
      title: 'Lookup API',
      data: {
        result: result,
        resultStr: beautify(JSON.stringify(result), { indent_size: 2 })
      }
    });

  }).catch(function(reason) {
    res.render('bitly/lookup', {
      title: 'Lookup API',
      data: {
        error: reason,
        errorStr: beautify(JSON.stringify(reason), { indent_size: 2 })
      }
    });
  });
});


module.exports = router;

