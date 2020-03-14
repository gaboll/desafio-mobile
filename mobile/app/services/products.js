import axios from 'axios';

export const getAllProducts = async () => {
  const baseUrl = 'https://desafio.mobfiq.com.br/Search/Criteria';
  const request = {
    Query: '',
    Offset: 0,
    Size: 10,
  };
  const requestOptions = {ContentType: 'application/json'};

  return axios
    .post(baseUrl, request, requestOptions)
    .then(response => response)
    .catch(error => error);
};
