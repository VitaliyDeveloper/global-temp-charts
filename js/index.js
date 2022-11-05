// async function fetchData() {
//   const response = await fetch("./ZonAnn.Ts+dSST.csv");
//   console.log(response);
//   return response.text();
// }

function fetchData() {
  fetch("./ZonAnn.Ts+dSST.csv")
    .then((response) => {
      return response.text();
    })
    .then((data) => console.log(Papa.parse(data, { header: true }).data));
}

fetchData();
