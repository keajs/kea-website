import PropTypes from 'prop-types'
import { delay } from 'redux-saga/effects'

import createForm from './create-form'

const isEmailValid = (email) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)
const missingText = 'This field is required'

export default createForm({
  propTypes: {
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string
  },

  defaults: {
    name: 'John Doe',
    email: '',
    message: ''
  },

  validate: (values) => ({
    name: !values.name ? missingText : null,
    email: !values.email ? missingText : (!isEmailValid(values.email) ? 'Invalid e-mail' : null),
    message: !values.message ? missingText : null
  }),

  submit: function * () {
    yield delay(1000)
  },

  success: function * (response) {
    window.alert('submit successful!', response)
  },

  failure: function * (error) {
    window.alert('submit error!', error)
  }
})
