

export class Map {

  addMap() {

    const latMin = 60;
    const latMax = 67;
    const lonMin = 5;
    const lonMax = 30;

    const map = L.map('mapid');

    map.fitBounds([
      [latMin, lonMin],
      [latMax, lonMax]
    ]);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoiam1nbnZlIiwiYSI6ImNqajRlNDQ3NDFrcmIzcG80eHA3MWd2eHQifQ.Un5Hd9eaGwWKgJt4VXIkCQ'
    }).addTo(map);

    return map;

  }


  plotHbv(catchmentName, data) {

    for (let i = 0; i < data.qpast.length; i++) {
      if (data.qpast[i] === -9999) {
        data.qpast[i] = NaN;
      }
      if (data.qfuture[i] === -9999) {
        data.qfuture[i] = NaN;
      }
    }

    let traceTair = {
      x: data.time,
      y: data.tair,
      name: "Air temperature",
      type: "scatter"
    };

    let tracePrec = {
      x: data.time,
      y: data.prec,
      yaxis: "y2",
      name: "Precipitation",
      type: "bar",
      marker: {
        color: "blue"
      },
      opacity: 0.5
    };

    let traceQobs = {
      x: data.time,
      y: data.qpast,
      yaxis: "y3",
      name: "Observed runoff",
      type: "scatter"
    };

    let traceQsim = {
      x: data.time,
      y: data.qfuture,
      yaxis: "y3",
      name: "Forecasted runoff",
      type: "scatter"
    };

    let layout = {

      autosize: true,

      margin: {
        t: 20,
        l: 50,
        r: 20,
        b: 40,
        pad: 0
      },

      xaxis: {
        showgrid: true
      },

      yaxis: {
        title: "Air temperature (°C)",
        domain: [0, 0.45],
        showgrid: false
      },

      yaxis2: {
        title: "Precipitation (mm/hr)",
        overlaying: "y",
        side: "right",
        autorange: "reversed",
        rangemode: "nonnegative"
      },

      yaxis3: {
        domain: [0.5, 1.0],
        title: "Runoff (m<sup>3</sup>/s)"
      },

      paper_bgcolor: "#a2a8b2"

    };

    let traces = [traceQobs, traceQsim, traceTair, tracePrec];

    Plotly.newPlot(catchmentName, traces, layout, { displayModeBar: false });

  }

  addMarkers(data, map) {

    let self = this;

    data.forEach(item => {

      let marker = new L.circle([item.lat, item.lon], {
        color: "green",
        fillColor: "green",
        fillOpacity: 0.5,
        radius: 5000
      })

      marker.bindPopup(`<div class="plotmap" id=\"${item.name}\"></div>`, {
        maxWidth: 1000
      })

      marker.on('popupopen', function (e) {
        self.plotHbv(item.name, item);
      }).addTo(map);

    })

  }

}