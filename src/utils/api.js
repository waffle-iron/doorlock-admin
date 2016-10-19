import axios from 'axios';
import { apiBaseUrl } from 'config';
import Promise from 'bluebird';
import { normalize } from 'normalizr';

var Api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'x-access-token': localStorage.token
  }
});

export default Api;

// Generic api abstraction for fetching entities
const getApi = (endpoint, filter, schema) => {
  return Api.get(endpoint,{ params: filter })
    .then( (response) => {
      if(response.data.success) {
        return response.data.data;
      }
      Promise.reject(response.data)
    })
    .then(
      (data) => {
        if(!data.rows) {
          return { response: {
            ...normalize(data, schema)}
          }
        }
        return { response: {
          ...normalize(data.rows, schema),
          count: data.count }
        }
      },
      (error) => ({ error })
    )
}

// Generic api abstraction for creating new entities
const createApi = (endpoint, body, schema) => {
  return Api.post(endpoint, body)
    .then( (response) => {
      if(response.data.success) {
        return response.data.data;
      }
      Promise.reject(response.data)
    })
    .then( (data) => ({ response: { ...normalize(data, schema)} }))
    .catch((error) => ({ error }))
}

// Generic api abstraction for deleting entities
const deleteApi = (endpoint, id) => {
  return Api.delete(endpoint)
    .then( (response) => {
      if(response.data.success) {
        return { response: { deleteId: id } };
      }
      Promise.reject(response.data)
    })
    .catch( (error) => ({ error, deleteId: id }) )
}

export const callApi = {
  get: getApi,
  create: createApi,
  delete: deleteApi
}
