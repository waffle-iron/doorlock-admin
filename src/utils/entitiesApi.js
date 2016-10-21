import { callApi } from './api';
import { Schema, arrayOf } from 'normalizr';

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

// Entity api calls
export const fetchUser = (id) => callApi.get(`/user/findById/${id}`, {}, userSchema);
export const fetchUsers = (filter) => callApi.get('/user', filter, userSchemaArray);
export const deleteUser = (id) => callApi.delete(`/user/delete/${id}`, id);
export const createUser = (newUser) => callApi.create('/user/add', newUser, userSchema);
export const editUser = (id, mutatedUser) => callApi.edit(`/user/edit/${id}`, mutatedUser, id, 'users');

export const fetchProduct = (id) => callApi.get(`/product/findById/${id}`, {}, productSchema);
export const fetchProducts = (filter) => callApi.get('/product', filter, productSchemaArray);

export const fetchTransactions = (filter) => callApi.get('/transaction', filter, transactionSchemaArray);
export const fetchSlots = (filter) => callApi.get('/slot', filter, slotSchemaArray);
