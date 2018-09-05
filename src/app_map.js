
import { Map } from './map.js'

const map = new Map();

let m = map.addMap();

fetch("data/data_array.json", {
  header: {
    "Content-type": "application/json"
  }
})
  .then(res => res.json())
  .then(res => map.addMarkers(res, m))




