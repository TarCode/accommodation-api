'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Upsert = exports.Update = exports.Remove = exports.InsertMany = exports.Insert = exports.FindOne = exports.FindMany = undefined;

var _db = require('./db');

const FindMany = exports.FindMany = (collection, query) => {
  return _db.mongo.then(db => {
    return new Promise((resolve, reject) => {
      db.collection(collection).find(query).sort({ createdAt: 1 }).toArray((err, docs) => {
        if (err) reject(err);
        resolve(docs);
      });
    });
  });
};

const FindOne = exports.FindOne = (collection, query) => {
  return _db.mongo.then(db => {
    return new Promise((resolve, reject) => {
      db.collection(collection).findOne(query, (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  });
};

const Insert = exports.Insert = (collection, data) => {
  return _db.mongo.then(db => {
    return new Promise((resolve, reject) => {
      db.collection(collection).insert(data, (err, docs) => {
        if (!err) {
          resolve(docs);
        }
        return reject(err);
      });
    });
  });
};

const InsertMany = exports.InsertMany = (collection, data) => {
  return _db.mongo.then(db => {
    return new Promise((resolve, reject) => {
      db.collection(collection).insertMany(data, { ordered: true }, (err, docs) => {
        if (!err) {
          resolve(docs);
        }
        return reject(err);
      });
    });
  });
};

const Remove = exports.Remove = (collection, query) => {
  return _db.mongo.then(db => {
    return new Promise((resolve, reject) => {
      db.collection(collection).remove(query, (err, doc) => {
        if (!err) {
          resolve(doc);
        }
        return reject(err);
      });
    });
  });
};

const Update = exports.Update = (collection, query, args) => {
  return _db.mongo.then(db => {
    return new Promise((resolve, reject) => {
      return db.collection(collection).findOneAndUpdate(query, { $set: args }, { returnOriginal: false }).then((_ref) => {
        let value = _ref.value;
        return resolve(value);
      }).catch(error => reject(err));
    });
  });
};

const Upsert = exports.Upsert = (collection, query, args) => {
  return _db.mongo.then(db => {
    return new Promise((resolve, reject) => {
      return db.collection(collection).findOneAndUpdate(query, { $set: args }, { upsert: true }).then((_ref2) => {
        let value = _ref2.value;
        return resolve(value);
      }).catch(error => reject(err));
    });
  });
};
//# sourceMappingURL=index.js.map