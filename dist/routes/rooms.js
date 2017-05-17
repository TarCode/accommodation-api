'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _mongodb = require('mongodb');

var _db = require('../db');

var _collections = require('../db/collections');

const router = (0, _express.Router)();

router.get('/', (req, res) => {
  (0, _db.FindMany)(_collections.ROOMS).then(results => res.send(results)).catch(err => res.send(err));
});

router.post('/add', (req, res) => {
  const room = req.body;
  (0, _db.Insert)(_collections.ROOMS, room).then(result => res.send(result));
});

router.post('/cancel', (req, res) => {
  const user = req.body;
  console.log('user from cancel', user);
  (0, _db.FindOne)(_collections.ROOMMATES, { name: user.name }).then(result => {
    if (result.name) {
      (0, _db.Remove)(_collections.ROOMMATES, { name: user.name }).then(rmResult => {
        console.log('remove', rmResult);
        res.send({ msg: "Cancelled" });
      });
    } else {
      res.send({ err: "Does not exist. Cannot cancel" });
    }
  }).catch(err => {
    res.send(err);
  });
});
// Book a student to room
router.post('/book', (req, res) => {
  const student = req.body.student;
  (0, _db.FindOne)(_collections.ROOMS, { _id: (0, _mongodb.ObjectID)(req.body.roomId) }).then(result => {
    (0, _db.FindMany)(_collections.ROOMMATES, { roomId: req.body.roomId }).then(rmResult => {
      if (rmResult.length < result.max_roommates) {
        let found = false;
        rmResult.forEach(rm => {
          if (rm.name === req.body.student.name) {
            found = true;
          }
        });
        if (!found) {
          req.body.student['roomId'] = req.body.roomId;
          (0, _db.Insert)(_collections.ROOMMATES, req.body.student).then(insRes => {
            console.log('insert result', insRes);
            res.send(insRes);
          });
        } else {
          res.send({ err: "You already booked this room" });
        }
      } else {
        res.send({ err: "Fully booked" });
      }
    });
  });
});

router.get('/:id', (req, res) => {
  (0, _db.FindOne)(_collections.ROOMS, { _id: (0, _mongodb.ObjectID)(req.params.id) }).then(result => {
    (0, _db.FindMany)(_collections.ROOMMATES, { roomId: req.params.id }).then(rmResult => {
      console.log('rmResult', rmResult, result);
      res.send({ room: result, roommates: rmResult });
    });
  }).catch(err => {
    res.send(err);
  });
});

exports.default = router;
//# sourceMappingURL=rooms.js.map