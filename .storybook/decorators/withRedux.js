import React from 'react'
import { Provider } from 'react-redux'

export default (store) => (story) => (<Provider store={store}>{story()}</Provider>)
