'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _mongodb = require('mongodb');

var _db = require('../db');

var _collections = require('../db/collections');

const router = (0, _express.Router)();

router.get('/:id', (req, res) => {
  (0, _db.FindOne)(_collections.ROOMMATES, { id: req.params.id }).then(result => {
    if (result.name) {
      res.send(result);
    } else {
      res.send({ msg: "No Rooms" });
    }
  }).catch(err => {
    res.send(err);
  });
});

exports.default = router;
//# sourceMappingURL=roommates.js.map