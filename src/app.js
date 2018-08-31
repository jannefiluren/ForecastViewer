
import { Plot } from './plots.js';
import { UI } from './ui.js';

const plot = new Plot();
const ui = new UI();

fetch("data/data_short.json", {
  header: {
    "Content-type": "application/json"
  }
})
  .then(res => res.json())
  .then(data => ui.fillPlotDiv(data))
  .then(data => plot.plotAll(data))
  .then(() => ui.closePreloader())
  .catch(err => console.log(err));

ui.searchStations();
