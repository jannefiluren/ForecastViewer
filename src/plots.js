
export class Plot {

  plotAll(data) {

    data.forEach(item => {
      this.plotHbv(item.name, item);
    })

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
      height: "600",

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

      title: catchmentName,

      titlefont: {
        size: 30
      },

      paper_bgcolor: "#a2a8b2"
    };

    let traces = [traceQobs, traceQsim, traceTair, tracePrec];

    Plotly.newPlot(catchmentName, traces, layout, { displayModeBar: false });

  }

}
