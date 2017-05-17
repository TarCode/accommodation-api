'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _rooms = require('./routes/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

var _roommates = require('./routes/roommates');

var _roommates2 = _interopRequireDefault(_roommates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 3001;

const app = (0, _express2.default)();

app.use((0, _cors2.default)({
  origin: (_origin, cb) => {
    return cb(null, true);
  }
}));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use('/rooms', _rooms2.default);
app.use('/roommates', _roommates2.default);

app.listen(port, () => {
  console.log('App listening on port ', port);
});

module.exports = app;
//# sourceMappingURL=index.js.map