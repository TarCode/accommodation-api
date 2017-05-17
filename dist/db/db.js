'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongo = exports.mongoUrl = undefined;

var _mongodb = require('mongodb');

const mongoUrl = exports.mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/accommodation-dev';

const mongo = exports.mongo = _mongodb.MongoClient.connect(process.env.NODE_ENV === 'test' ? 'mongodb://localhost/accommodation-test' : mongoUrl);
//# sourceMappingURL=db.js.map