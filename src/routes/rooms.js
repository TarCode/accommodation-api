import { Router } from 'express'
import { ObjectID } from 'mongodb'
import {
  FindMany, FindOne, Update, Insert, Remove
} from '../db'

import {
  ROOMS,
  ROOMMATES
} from '../db/collections'

const router = Router()

router.get('/', (req, res) => {
  FindMany(ROOMS)
  .then(results => (
    res.send(results)
  ))
  .catch(err => (
    res.send(err)
  ))
})

router.post('/add', (req, res) => {
  const room = req.body
  Insert(ROOMS, room)
  .then(result => (
    res.send(result)
  ))
})

router.post('/cancel', (req, res) => {
  const user = req.body
  console.log('user from cancel', user);
  FindOne(ROOMMATES, { name: user.name })
  .then(result => {
    if(result.name) {
      Remove(ROOMMATES, { name: user.name })
      .then(rmResult => {
        console.log('remove', rmResult)
        res.send({ msg: "Cancelled"})
      })
    } else {
      res.send({err: "Does not exist. Cannot cancel"})
    }
  })
  .catch(err => {
    res.send(err)
  })
})
// Book a student to room
router.post('/book', (req, res) => {
  const student = req.body.student
  FindOne(ROOMS, { _id: ObjectID(req.body.roomId) })
  .then(result => {
    FindMany(ROOMMATES, { roomId: req.body.roomId })
    .then(rmResult => {
      if(rmResult.length < result.max_roommates) {
        let found = false
        rmResult.forEach(rm => {
          if(rm.name === req.body.student.name) {
            found = true
          }
        })
        if(!found) {
          req.body.student['roomId'] = req.body.roomId
          Insert(ROOMMATES, req.body.student)
          .then(insRes => {
            console.log('insert result', insRes);
            res.send(insRes)
          })
        } else {
          res.send({ err: "You already booked this room"})
        }
      } else {
        res.send({ err: "Fully booked"})
      }
    })
  })
})

router.get('/:id', (req, res) => {
  FindOne(ROOMS, { _id: ObjectID(req.params.id) })
  .then(result => {
    FindMany(ROOMMATES, { roomId: req.params.id })
    .then(rmResult => {
      console.log('rmResult', rmResult, result);
      res.send({room: result, roommates: rmResult})
    })
  })
  .catch(err => {
    res.send(err)
  })
})

export default router
