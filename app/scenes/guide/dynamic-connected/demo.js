import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea, connect } from 'kea'

// create a dynamic logic store
const dynamicLogic = kea({
  key: (props) => props.id,

  path: (key) => ['scenes', 'dynamic', key],

  actions: () => ({
    doit: true
  }),

  reducers: ({ actions }) => ({
    done: [false, PropTypes.bool, {
      [actions.doit]: () => true
    }]
  })
})

// wrap it around a component
@dynamicLogic
class OnlyData extends Component {
  render () {
    return <div>OnlyData - id: {this.props.id}, done: {this.props.done ? 'true' : 'false'}</div>
  }
}

// create another helper that wants data from this dynamic logic store
@connect({
  actions: [
    dynamicLogic, [
      'doit'
    ]
  ],
  props: [
    dynamicLogic.withKey(params => params.id), [
      'done'
    ]
  ]
})
class DataWithButtion extends Component {
  render () {
    return (
      <div>
        <p>DataWithButtion - id: {this.props.id}, done: {this.props.done ? 'true' : 'false'}</p>
        <p><button onClick={this.actions.doit}>Do it!</button></p>
      </div>
    )
  }
}

// main demo
export default class Demo extends Component {
  render () {
    return (
      <div>
        <OnlyData id={123} />
        <DataWithButtion id={123} />
      </div>
    )
  }
}