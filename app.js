function removeLoader() {
  const preloader = document.querySelector(".preloader-wrapper");
  preloader.classList.remove("active");
}

function createDivs(data) {
  const allPlots = document.querySelector("#allplots");

  let html = [];
  for (tmp in data) {
    html += `
    <div class="plot">
    <div id="${tmp}" class="singlePlot"></div>
    </div>
    `;
  }
  allPlots.innerHTML = html;

  for (tmp in data) {
    plot(tmp, data[tmp]);
  }
}

function plot(catchmentName, data) {
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
      autorange: "reversed"
    },

    yaxis3: {
      domain: [0.5, 1.0],
      title: "Runoff (m<sup>3</sup>/s)"
    },

    title: catchmentName,

    titlefont: {
      size: 30
    },

    paper_bgcolor: "#e5e5e5"
  };

  let traces = [traceQobs, traceQsim, traceTair, tracePrec];

  Plotly.newPlot(catchmentName, traces, layout, { displayModeBar: false });
}

fetch("data/data.json", {
  header: {
    "Content-type": "application/json"
  }
})
  .then(res => res.json())
  .then(data => createDivs(data))
  .then(() => removeLoader())
  .catch(err => console.log(err));

const selectStation = document.getElementById("selectStation");

selectStation.addEventListener("keyup", () => {
  let plots = document.querySelectorAll(".singlePlot");

  let searchString = document.getElementById("selectStation").value;

  plots.forEach(plot => {
    if (plot.getAttribute("id").indexOf(searchString) !== -1) {
      plot.parentElement.style.display = "block";
    } else {
      plot.parentElement.style.display = "none";
    }
  });
});
