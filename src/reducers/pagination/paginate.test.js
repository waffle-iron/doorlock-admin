import paginate from './paginate';
import merge from 'lodash/merge';

describe('paginate reducer creator', () => {
  const inputObj = {
    types: ['request', 'success', 'failure'],
    mapActionToKey: (action) => action.name
  }
  const initState = {
    pages: 0,
    pageCount: 0,
    nextPageExists: true,
    nextPage: {
      limit: 10,
      offset: 0,
    },
    filter: {},
    ids: [],
    isLoading: false,
  }

  describe('error handling input', () => {

    it('should throw when types is not an array or dont have tre elements', () => {
      expect( () => paginate({ types: 'a' }) )
        .toThrow('Expected types to be an array of three elements.')
      expect( () => paginate({ types: ['a', 'b'] }) )
        .toThrow('Expected types to be an array of three elements.')
    });

    it('should throw when one of types elements is not a string', () => {
      expect( () => paginate({ types: ['a', 1, 'c'] }) )
        .toThrow('Expected types to be strings.')
    });

    it('should throw when mapActionToKey is not a function', () => {
      expect(
        () => paginate({
          ...inputObj,
          mapActionToKey: 2
        })
      )
        .toThrow('Expected mapActionToKey to be a function.')
    });
  });

  describe('action handling', () => {

    it('should set isLoading to true when requestType is dispatched', () => {
      const paginator = paginate(inputObj);
      expect(paginator({}, { type: 'request', name: 'list'}))
        .toEqual({
          list: merge({}, initState, {
            isLoading: true
          })
        })
    });

    it('should set isLoading to false when failureType is dispatched', () => {
      const paginator = paginate(inputObj);
      const oldState = merge({}, initState, {
        isLoading: true
      });
      expect(paginator({list:oldState}, { type: 'failure', name: 'list'}))
        .toEqual({
          list: merge({}, initState, {
            isLoading: false
          })
        })
    });

    it('should update filter and reset state when requestType is dispatched with filter prop', () => {
      const paginator = paginate(inputObj);
      const oldState = merge({}, initState, {
        pages: 4,
        pageCount: 3,
        nextPage: {
          offset: 20
        },
        ids: [ 0, 1, 2 ]
      });
      const action = {
        type: 'request',
        name: 'list',
        filter: {
          firstName: 'ole'
        }
      }

      expect(
        paginator({list:oldState}, action)
      )
        .toEqual({
          list: merge({}, initState, {
            isLoading: true,
            pages: 0,
            pageCount: 0,
            nextPage: {
              offset: 0
            },
            filter: {
              firstName: 'ole'
            },
            ids: []
          })
        })
    });

    it('should update pages, and next props on successType', () => {
      const paginator = paginate(inputObj);
      const oldState = merge({}, initState, {
        pages: 0,
        pageCount: 1,
        nextPageExists: false,
        nextPage: {
          offset: 10
        },
        ids: [ 0, 1, 2]
      });
      const action = {
        type: 'success',
        name: 'list',
        response: {
          result: [ 4, 5, 0 ],
          count: 25
        }
      }
      expect(
        paginator({list:oldState}, action)
      )
        .toEqual({
          list: merge({}, initState, {
            isLoading: false,
            pages: 3,
            pageCount: 2,
            nextPageExists: true,
            nextPage: {
              offset: 20
            },
            ids: [0, 1, 2, 4, 5]
          })
        })
    });

    it('should set nextPageExists to false when no more pages on successType', () => {
      const paginator = paginate(inputObj);
      const oldState = merge({}, initState, {
        pages: 0,
        pageCount: 1,
        nextPageExists: true,
        nextPage: {
          offset: 10
        }
      });
      const action = {
        type: 'success',
        name: 'list',
        response: {
          result: [],
          count: 15
        }
      }
      expect(
        paginator({list:oldState}, action)
      )
        .toEqual({
          list: merge({}, initState, {
            pages: 2,
            pageCount: 2,
            isLoading: false,
            nextPageExists: false,
            nextPage: {
              offset: 20
            },

          })
        })
    });

  });
});
