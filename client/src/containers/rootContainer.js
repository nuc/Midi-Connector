import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { midiConnectActions } from 'actions'

class MidiConnect extends Component {

  componentDidMount() {
    const { fetchMidiConnections } = this.props
    fetchMidiConnections()
  }

  get devices() {
    const { midiConnect } = this.props
    const midiDevices = midiConnect.get('midiDevices')
    if (midiDevices.size) {
      return (
        <ul>
          {midiDevices.map(device => <li>{device.get('name')}</li>)}
        </ul>
      )
    }
  }

  render() {
    const { midiConnect } = this.props
    return (
      <div className="root-container">
        <h1>midiConnections</h1>
        <p>{midiConnect.get('itemStatus')}</p>
        <p>{this.devices}</p>
        <button>SELECT SOURCE</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  midiConnect: state.get('midiConnect')
})

export default connect(mapStateToProps, {
  fetchMidiConnections: midiConnectActions.fetchStart,
})(MidiConnect)

