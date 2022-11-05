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
  .then(({ years, temps }) => drawChart(years, temps));

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
      acc.temps.push(Number(entry.Glob) + globalTemp);
      return acc;
    },
    { years: [], temps: [] }
  );
}

function drawChart(labels, data) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# Global temp",
          data: data,
          backgroundColor: ["black"],
          borderColor: ["yellow"],
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
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
