import api from './api';
import Promise from 'bluebird';
import { Schema, arrayOf, normalize } from 'normalizr';

// Generic api abstraction for fetching entities
const callApi = (endpoint, filter, schema) => {
  return api.get(endpoint,{ params: filter })
    .then( (response) => {
      if(response.data.success) {
        return response.data.data;
      }
      Promise.reject(response.data)
    })
    .then(
      (data) => {
        if(!data.rows) {
          return { ...normalize(data, schema)}
        }
        return { ...normalize(data.rows, schema), count: data.count }
      },
      (error) => ({ message: error.data ? error.data.message : error.message})
    )
}

// Schemas for Github API responses.
const userSchema = new Schema('users', {
  idAttribute: 'id'
});
const transactionSchema = new Schema('transactions', {
  idAttribute: 'id'
});
const productSchema = new Schema('products', {
  idAttribute: 'id'
});
const slotSchema = new Schema('slots', {
  idAttribute: 'id'
});

transactionSchema.define({
  user: userSchema,
  product: productSchema
});
slotSchema.define({
  product: productSchema,
});

const userSchemaArray = arrayOf(userSchema);
const transactionSchemaArray = arrayOf(transactionSchema);
const productSchemaArray = arrayOf(productSchema);
const slotSchemaArray = arrayOf(slotSchema);

// Entity data fetchers
export const fetchUser = (id) => callApi(`/user/findById/${id}`, {}, userSchema);
export const fetchUsers = (filter) => callApi('/user', filter, userSchemaArray);

export const fetchProduct = (id) => callApi(`/product/findById/${id}`, {}, productSchema);
export const fetchProducts = (filter) => callApi('/product', filter, productSchemaArray);

export const fetchTransactions = (filter) => callApi('/transaction', filter, transactionSchemaArray);
export const fetchSlots = (filter) => callApi('/slot', filter, slotSchemaArray);
