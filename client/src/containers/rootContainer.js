import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { midiConnectActions } from 'actions'

class MidiConnect extends Component {

  componentDidMount() {
    const { fetchMidiConnections } = this.props
    fetchMidiConnections()
  }

  render() {
    const { midiConnect } = this.props
    return (
      <div className="root-container">
        <h1>midiConnections</h1>
        <p>{midiConnect.get('fetchStatus')}</p>
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

