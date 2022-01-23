import axios from 'axios';

// http://api.tvmaze.com/schedule/web?date=2020-01-07
// api.tvmaze.com/shows/{id}/cast
axios.defaults.baseURL = 'http://api.tvmaze.com/';

export const fetchSerials = () => {
  return axios.get(`schedule/web?date=2020-01-07`).then(({ data }) => data);
};

export const fetchhSerialsCast = serialId => {
  return axios.get(`shows/${serialId}/cast`).then(({ data }) => data);
};
