import { mongo } from './db'

export const FindMany = (collection, query) => {
  return mongo.then(db => {
    return new Promise((resolve, reject) => {
      db.collection(collection).find(query).sort({createdAt: 1}).toArray((err, docs) => {
        if (err) reject(err)
        resolve(docs)
      })
    })
  })
}

export const FindOne = (collection, query) => {
  return mongo.then(db => {
    return new Promise((resolve, reject) => {
      db.collection(collection).findOne(query, (err, doc) => {
        if (err) reject(err)
        resolve(doc)
      })
    })
  })
}

export const Insert = (collection, data) => {
  return mongo.then(db => {
    return new Promise((resolve, reject) => {
      db.collection(collection).insert(data, (err, docs) => {
        if (!err) {
          resolve(docs)
        }
        return reject(err);
      })
    })
  })
}

export const InsertMany = (collection, data) => {
  return mongo.then(db => {
    return new Promise((resolve, reject) => {
      db.collection(collection).insertMany(data, { ordered: true }, (err, docs) => {
        if (!err) {
          resolve(docs)
        }
        return reject(err);
      })
    })
  })
}

export const Remove = (collection, query) => {
  return mongo.then(db => {
    return new Promise((resolve, reject) => {
      db.collection(collection).remove(query, (err, doc) => {
        if (!err) {
          resolve(doc)
        }
        return reject(err);
      })
    })
  })
}

export const Update = (collection, query, args) => {
  return mongo.then(db => {
    return new Promise((resolve, reject) => {
      return db.collection(collection).findOneAndUpdate(query, { $set: args }, { returnOriginal: false })
      .then(({ value }) => resolve(value))
      .catch(error => reject(err))
    })
  })
}

export const Upsert = (collection, query, args) => {
  return mongo.then(db => {
    return new Promise((resolve, reject) => {
      return db.collection(collection).findOneAndUpdate(query, { $set: args }, { upsert: true })
      .then(({ value }) => resolve(value))
      .catch(error => reject(err))
    })
  })
}
