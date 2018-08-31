
export class UI {

  constructor() {
    this.allPlots = document.querySelector("#allplots");
    this.preloader = document.querySelector(".preloader-background");
    this.selectStation = document.getElementById("selectStation");
  }

  fillPlotDiv(data) {

    var tmp;

    let html = [];
    for (tmp in data) {
      html += `
      <div class="plot">
      <div id="${tmp}" class="singlePlot"></div>
      </div>
      `;
    }

    this.allPlots.innerHTML = html;

    return data;

  }

  closePreloader() {
    this.preloader.remove();
  }

  searchStations() {

    this.selectStation.addEventListener("keyup", () => {

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
  }

}

