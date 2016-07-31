import massive from 'massive'
import stringify from 'json-stringify-safe'
import getPoint from './get-point'

const db = massive.connectSync({db: 'musicbrainz'})

const query = {"begin_date_year !=": null, "end_date_year !=": null, "begin_area !=": null}

// Get longitude and latitude using the MusicBrainz area ID
db.musicbrainz.artist.find(query, (er, res) => {
  console.log(`Result: ${stringify(res, null, 2)}`)
  db.musicbrainz.area.findOne(res[0].begin_area, (er, area) => {
    getPoint(area, (point) => {
      console.log(JSON.stringify(point))
    })
    console.log(`Area: ${stringify(area)}`)
  })
})
//const js = stringify(db, null, 2)
//console.log(js)
