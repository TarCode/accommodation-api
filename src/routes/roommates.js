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

router.get('/:id', (req, res) => {
  FindOne(ROOMMATES, { id: req.params.id })
  .then(result => {
    if(result.name) {
      res.send(result)
    } else {
      res.send({msg: "No Rooms"})
    }
  })
  .catch(err => {
    res.send(err)
  })
})

export default router
