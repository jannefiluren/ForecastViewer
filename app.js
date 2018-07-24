

function createDivs(data) {
    
  const allPlots = document.querySelector("#allplots");
  
  let html = [];
  for (tmp in data) {
    html += `
    <div class="plot">
    <div id="${tmp}"></div>
    </div>
    `;
    
  }
  allPlots.innerHTML = html;
  
  for (tmp in data) {
    plot(tmp, data[tmp])
  }
    
}


function plot(catchmentName, data) {

  for (let i=0; i<data.qpast.length; i++) {
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
    name: 'Air temperature',
    type: 'scatter'
  }
  
  let tracePrec = {
    x: data.time,
    y: data.prec,
    yaxis: 'y2',
    name: 'Precipitation',
    type: 'bar',
    marker: {
      color: 'blue',
    },
    opacity: 0.5
  }
  
  let traceQobs = {
    x: data.time,
    y: data.qpast,
    yaxis: 'y3',
    name: 'Observed runoff',
    type: 'scatter'
  };
  
  let traceQsim = {
    x: data.time,
    y: data.qfuture,
    yaxis: 'y3',
    name: 'Forecasted runoff',
    type: 'scatter'
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
      title: 'Precipitation (mm/hr)',
      overlaying: 'y',
      side: 'right',
      autorange: 'reversed'
    },
    
    yaxis3: {
      domain: [0.5, 1.0],
      title: "Runoff (m<sup>3</sup>/s)"
    },
    
    title: catchmentName,
    
    titlefont: {
      size: 30
    },

    paper_bgcolor: 'lightgray'

  }

  let traces = [traceQobs, traceQsim, traceTair, tracePrec];
  
  Plotly.newPlot(catchmentName, traces, layout);
  
}


fetch("data/output.json", {
  header: {
    "Content-type": "application/json"
  }
}).then(res => res.json())
  .then(data => createDivs(data))
  .catch(err => console.log(err));
