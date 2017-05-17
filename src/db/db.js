import { MongoClient } from 'mongodb'

export const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/accommodation-dev'

export const mongo = MongoClient.connect(process.env.NODE_ENV === 'test' ? 'mongodb://localhost/accommodation-test' : mongoUrl)
