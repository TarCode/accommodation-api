import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const port = process.env.PORT || 3000

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

app.listen(port, () => {
  console.log('App listening on port ', port);
})
