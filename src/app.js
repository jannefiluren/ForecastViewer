import { plot } from './plots.js';

function createDivs(data) {
  const allPlots = document.querySelector("#allplots");
  const preloader = document.querySelector(".preloader-background");

  var tmp;

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

  preloader.remove();
}


fetch("data/data_short.json", {
  header: {
    "Content-type": "application/json"
  }
})
  .then(res => res.json())
  .then(data => createDivs(data))
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
