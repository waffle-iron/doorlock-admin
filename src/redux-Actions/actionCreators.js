
export const action = (type, payload = {}) => {
  return {type, ...payload}
}

export const listAsyncActions = (asyncActionTypes) => {
  return {
    filter: (filter) => action(asyncActionTypes.FILTER, {filter}),
    get: {
      request: () => action(asyncActionTypes.REQUEST),
      success: (response) => action(asyncActionTypes.SUCCESS, {response}),
      failure: (error) => action(asyncActionTypes.FAILURE, {error}),
    },
  }
}

export const singleAsyncActions = (asyncActionTypes) => {
  return {
    get: {
      request: () => action(asyncActionTypes.REQUEST),
      success: (response) => action(asyncActionTypes.SUCCESS, {response}),
      failure: (error) => action(asyncActionTypes.FAILURE, {error}),
    },
    create: {
      request: () => action(asyncActionTypes.CREATE_REQUEST),
      success: (response) => action(asyncActionTypes.CREATE_SUCCESS, {response}),
      failure: (error) => action(asyncActionTypes.CREATE_FAILURE, {error}),
    },
    edit: {
      request: () => action(asyncActionTypes.EDIT_REQUEST),
      success: (response) => action(asyncActionTypes.EDIT_SUCCESS, {response}),
      failure: (error) => action(asyncActionTypes.EDIT_FAILURE, {error}),
    },
    delete: {
      request: () => action(asyncActionTypes.DELETE_REQUEST),
      success: ({deleteId}) => action(asyncActionTypes.DELETE_SUCCESS, {deleteId}),
      failure: (error) => action(asyncActionTypes.DELETE_FAILURE, {error}),
    }
  }
}

export const entityDontExist = (entity, dontExist) => action(ENTITY_DONT_EXIST, { entity, dontExist})
