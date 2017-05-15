import { Router } from 'express'
import { ObjectID } from 'mongodb'
import {
  FindMany, FindOne, Update, Insert, Remove
} from '../db'

import {
  ROOMS
} from '../db/collections'

const router = Router()

router.get('/rooms', (req, res) => {
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
