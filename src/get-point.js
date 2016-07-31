import wdk from 'wikidata-sdk'
import request from 'request'

const musicBrainzIdIs = 'wdt:P982'
const coordinateLocationIs = 'wdt:P625'

function sparql(mbid) {
  return `
  PREFIX wdt: <http://www.wikidata.org/prop/direct/>
  SELECT ?coordinate WHERE {
    ?area ${musicBrainzIdIs} "${mbid}".
    ?area ${coordinateLocationIs} ?coordinate.
  }
  `
}

function getSubStr(str, firstDelim, secondDelim) {
  var a = str.indexOf(firstDelim)
  if (a == -1) return ''
  var b = str.indexOf(secondDelim, a + 1)
  if (b == -1) return ''
  return str.substr(a + 1, b - a - 1)
}

function parsePoint(str) {
    const coordinates = getSubStr(str, '(', ')').split(' ').map(parseFloat)
    const point = { long: coordinates[0], lat: coordinates[1] }
    return point
}

export default function getPoint(area, cb) {
  const url = wdk.sparqlQuery(sparql(area.gid))
  request(url, (err, res, body) => {
    const data = wdk.simplifySparqlResults(body)[0]
    const point = parsePoint(data)
    cb(point)
  })
}
