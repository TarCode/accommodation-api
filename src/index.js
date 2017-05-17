import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import rooms from './routes/rooms'
import roommates from './routes/roommates'

const port = process.env.PORT || 3001

const app = express()

app.use(cors({
    origin: (origin, cb) => {
      return cb(null, true)
    },
    // credentials: true,
    // allowedHeaders: [ 'Content-Type', 'Authorization' ]
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/rooms', rooms)
app.use('/roommates', roommates)

app.listen(port, () => {
  console.log('App listening on port ', port);
})

module.exports = app
