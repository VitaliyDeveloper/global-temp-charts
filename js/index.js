// async function fetchData() {
//   const response = await fetch("./ZonAnn.Ts+dSST.csv");
//   console.log(response);
//   return response.text();
// }

const ctx = document.querySelector(".js-chart").getContext("2d");
// console.log(ctx);
const globalTemp = 14;

fetchData()
  .then(parseData)
  .then(getLabelandData)
  .then(({ years, tempsGlobal, tempsNorth, tempsSouth }) =>
    drawChart(years, tempsGlobal, tempsNorth, tempsSouth)
  );

function fetchData() {
  return fetch("./ZonAnn.Ts+dSST.csv").then((response) => {
    return response.text();
  });
}

function parseData(data) {
  return Papa.parse(data, { header: true }).data;
}

function getLabelandData(data) {
  return data.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year);
      acc.tempsGlobal.push(Number(entry.Glob) + globalTemp);
      acc.tempsNorth.push(Number(entry.NHem) + globalTemp);
      acc.tempsSouth.push(Number(entry.SHem) + globalTemp);

      return acc;
    },
    { years: [], tempsGlobal: [], tempsNorth: [], tempsSouth: [] }
  );
}

function drawChart(labels, tempsGlobal, tempsNorth, tempsSouth) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# Global temp",
          data: tempsGlobal,
          backgroundColor: "rgba(130, 130, 130, 0.8)",
          borderColor: "rgba(7, 7, 7, 0.8)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "# North temp",
          data: tempsNorth,
          backgroundColor: "rgba(155, 245, 245, 0.8)",
          borderColor: "rgba(90, 230, 225, 0.8)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "# South temp",
          data: tempsSouth,
          backgroundColor: "rgba(185, 245, 190, 0.8)",
          borderColor: "rgba(110, 245, 125, 0.8)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

// .then((data) => {
// const parseData = Papa.parse(data, { header: true }).data;

//       const mapperData = parseData.reduce(
//         (acc, entry) => {
//           acc.years.push(entry.Year);
//           acc.temps.push(Number(entry.Glob) + globalTemp);
//           return acc;
//         },
//         { years: [], temps: [] }
//       );

//       console.log(mapperData);

//       //   const years = parseData.map((entry) => entry.Year);
//       //   const temps = parseData.map((entry) => Number(entry.Glob) + globalTemp);
//       //   console.log(years);
//       //   console.log(temps);

//       new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: mapperData.years,
//           datasets: [
//             {
//               label: "# Global temp",
//               data: mapperData.temps,
//               backgroundColor: ["black"],
//               borderColor: ["yellow"],
//               borderWidth: 1,
//               fill: false,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: false,
//             },
//           },
//         },
//       });
//     });
