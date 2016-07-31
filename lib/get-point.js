'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPoint;

var _wikidataSdk = require('wikidata-sdk');

var _wikidataSdk2 = _interopRequireDefault(_wikidataSdk);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var musicBrainzIdIs = 'wdt:P982';
var coordinateLocationIs = 'wdt:P625';

function sparql(mbid) {
  return '\n  PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n  SELECT ?coordinate WHERE {\n    ?area ' + musicBrainzIdIs + ' "' + mbid + '".\n    ?area ' + coordinateLocationIs + ' ?coordinate.\n  }\n  ';
}

function getSubStr(str, firstDelim, secondDelim) {
  var a = str.indexOf(firstDelim);
  if (a == -1) return '';
  var b = str.indexOf(secondDelim, a + 1);
  if (b == -1) return '';
  return str.substr(a + 1, b - a - 1);
}

function parsePoint(str) {
  var coordinates = getSubStr(str, '(', ')').split(' ').map(parseFloat);
  var point = { long: coordinates[0], lat: coordinates[1] };
  return point;
}

function getPoint(area, cb) {
  var url = _wikidataSdk2.default.sparqlQuery(sparql(area.gid));
  (0, _request2.default)(url, function (err, res, body) {
    var data = _wikidataSdk2.default.simplifySparqlResults(body)[0];
    var point = parsePoint(data);
    cb(point);
  });
}
module.exports = exports['default'];
//# sourceMappingURL=get-point.js.map