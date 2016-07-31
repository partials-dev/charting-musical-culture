'use strict';

var _massive = require('massive');

var _massive2 = _interopRequireDefault(_massive);

var _jsonStringifySafe = require('json-stringify-safe');

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

var _getPoint = require('./get-point');

var _getPoint2 = _interopRequireDefault(_getPoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _massive2.default.connectSync({ db: 'musicbrainz' });

var query = { "begin_date_year !=": null, "end_date_year !=": null, "begin_area !=": null };

// Get longitude and latitude using the MusicBrainz area ID
db.musicbrainz.artist.find(query, function (er, res) {
  console.log('Result: ' + (0, _jsonStringifySafe2.default)(res, null, 2));
  db.musicbrainz.area.findOne(res[0].begin_area, function (er, area) {
    (0, _getPoint2.default)(area, function (point) {
      console.log(JSON.stringify(point));
    });
    console.log('Area: ' + (0, _jsonStringifySafe2.default)(area));
  });
});
//const js = stringify(db, null, 2)
//console.log(js)
//# sourceMappingURL=index.js.map