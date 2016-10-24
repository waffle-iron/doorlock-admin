import React from 'react';
import MemberForm from './MemberForm.jsx';
import { storiesOf } from '@kadira/storybook';
import { action, decorateAction } from '@kadira/storybook-addon-actions'
import { containerWidth, withRedux } from 'storybook-decorators';
import { withKnobs, text } from '@kadira/storybook-addon-knobs';
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { change, startSubmit, stopSubmit, reset } from 'redux-form';
import Promise from 'bluebird'

const store = createStore(
  combineReducers({
    form: formReducer
  }),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)

const scanCard = () => {
  new Promise( (resolve, reject) => {
    window.setTimeout( () => resolve(Date.now().toString()), 200)
  })
  .then( (id) => {
    store.dispatch(change('addMember', 'studentCardId', id))
  })
}

const submit = (values) => {
  store.dispatch(startSubmit('addMember'))
  action('submitForm')(values)
  window.setTimeout( () => {
    store.dispatch(stopSubmit('addMember'))
    store.dispatch(reset('addMember'))
  }, 200)
}

storiesOf('MemberForm', module)
  .addDecorator(containerWidth(500, true))
  .addDecorator(withKnobs)
  .addDecorator(withRedux(store))
  .add('Add member', () => {

    return (
      <MemberForm
        form='addMember'
        title={text('text', 'Legg til medlem')}
        submitBtnTxt={text('submitBtnTxt', 'Legg til medlem')}
        scanCard={{
          isLoading: false,
          click: scanCard
        }}
        onSubmit={submit}
        />
    )
  })
