const basicUrl = "https://api.tvmaze.com/schedule/web?date=2020-01-07";

const fetchSerials = () => {
  return fetch(basicUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error Fetching data");
    })
    .then((results) => {
      console.log(results);
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
};

console.log(fetchSerials());
