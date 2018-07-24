

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

  let trace1 = {
    x: data.time,
    y: data.qpast,
    name: 'Observed runoff',
    type: 'scatter'
  };

  let trace2 = {
    x: data.time,
    y: data.qfuture,
    name: 'Forecasted runoff',
    type: 'scatter'
  };
  
  let trace3 = {
    x: data.time,
    y: data.tair,
    yaxis: 'y2',
    name: 'Air temperature',
    type: 'scatter'
  }

  let trace4 = {
    x: data.time,
    y: data.prec,
    yaxis: 'y3',
    name: 'Precipitation',
    type: 'scatter'
  }
  



  let layout = {

    height: "600",
    
    yaxis: {
      domain: [0.45, 1.0],
      title: "Runoff (m<sup>3</sup>/s)"
    },
    
    yaxis2: {
      domain: [0, 0.38],
      title: "Air temperature (°C)"
    },
    
    yaxis3: {
      title: 'Precipitation (mm/hr)',
      overlaying: 'y2',
      side: 'right'
    },
    
    title: catchmentName,
    
    titlefont: {
      size: 30
    },

    paper_bgcolor: 'lightgray'

  }

  let traces = [trace1, trace2, trace3, trace4];
  
  Plotly.newPlot(catchmentName, traces, layout);
  
}


fetch("data/output.json", {
  header: {
    "Content-type": "application/json"
  }
}).then(res => res.json())
  .then(data => createDivs(data))
  .catch(err => console.log(err));

