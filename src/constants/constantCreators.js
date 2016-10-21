const REQUEST = 'REQUEST'
const FILTER = 'FILTER'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const CREATE = 'CREATE'
const EDIT = 'EDIT'
const DELETE = 'DELETE'

export const createRequestTypes = (base) => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const createRequestWithFilterTypes = (base) => {
  return [REQUEST, FILTER, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const createMutationTypes = (base) => {
  return [CREATE, EDIT, DELETE].reduce((acc, type) => {
    [REQUEST, SUCCESS, FAILURE].forEach((reqType) => {
      acc[`${type}_${reqType}`] = `${base}_${type}_${reqType}`
    })
		return acc
	}, {})
}
