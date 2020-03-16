import axios from 'axios';

export const getAllCategories = async () => {
  const baseUrl = 'https://desafio.mobfiq.com.br/StorePreference/CategoryTree';

  const requestOptions = {ContentType: 'application/json'};

  return axios
    .get(baseUrl, requestOptions)
    .then(response => response)
    .catch(error => error);
};
