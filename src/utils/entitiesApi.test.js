// Needs to have a property testToken in config file, and an api running to work
// Test fail but makes it easy to see actual response
import {
  fetchUser,
  fetchUsers,

  fetchProduct,
  fetchProducts,

  fetchTransactions,
  fetchSlots } from './entitiesApi';

xdescribe('fetchUser', () => {
  it('should fetch user', () => {
    return fetchUser(140)
      .then( (result) =>
        expect(result)
          .toEqual({
            entities: {
              users: {

              }
            },
            result: []
          })

      );
  });
});

xdescribe('fetchUsers', () => {
  it('should fetch users', () => {
    const filter = {
      limit: 1,
    }
    return fetchUsers(filter)
      .then( (result) =>
        expect(result)
          .toEqual({
            entities: {
              users: {

              }
            },
            count: 22,
            result: []
          })

      );
  });
});

xdescribe('fetchTransactions', () => {
  it('should fetch users', () => {
    const filter = {
      limit: 2,
    }
    return fetchTransactions(filter)
      .then( (result) =>
        expect(result)
          .toEqual({
            entities: {
              transactions: {
              },
              users: {

              }
            },
            count: 22,
            result: []
          })

      );
  });
});

xdescribe('fetchProduct', () => {
  it('should fetch users', () => {
    return fetchProduct(1)
      .then( (result) =>
        expect(result)
          .toEqual({
            entities: {
              products: {
              },
            },
            result: []
          })

      );
  });
});

xdescribe('fetchProducts', () => {
  it('should fetch users', () => {
    const filter = {
      limit: 1,
    }
    return fetchProducts(filter)
      .then( (result) =>
        expect(result)
          .toEqual({
            entities: {
              products: {
              },
            },
            count: 22,
            result: []
          })

      );
  });
});

xdescribe('fetchSlots', () => {
  it('should fetch users', () => {
    const filter = {
      limit: 1,
    }
    return fetchSlots(filter)
      .then( (result) =>
        expect(result)
          .toEqual({
            entities: {
              slots: {
              },
              products: {}
            },
            count: 22,
            result: []
          })

      );
  });
});
