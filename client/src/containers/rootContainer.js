import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { midiConnectActions } from 'actions'

class MidiConnect extends Component {

  componentDidMount() {
    const { fetchMidiConnections } = this.props
    fetchMidiConnections()
  }

  fetchAgain = () => {
    const { fetchMidiConnections } = this.props
    fetchMidiConnections()
  }

	disconnect = () => {
		const { disconnect } = this.props
		disconnect()
	}

  select = event => {
    const { target: { dataset: { deviceType, devicePortId } } } = event
    this.setState({
      [deviceType]: devicePortId
    })
  }

  connect = () => {
    const { createConnection } = this.props
    const payload = {
      sourceId: this.state.source,
      targetId: this.state.target
    }
    createConnection(payload)
  }

  devices(type) {
    const { midiConnect } = this.props
    const midiDevices = midiConnect.get('midiDevices')
    if (midiDevices.size) {
      return (
        <ul>
          {midiDevices.map(device => <div>
            <li>{device.get('name')}</li>
            <ul>{device.get('ports').map(port => <li onClick={this.select} data-device-type={type} data-device-port-id={`${device.get('clientId')}:${port.get('portId')}`}>{port.get('portName')}</li>)}</ul>
          </div>)}
        </ul>
      )
    }
  }

  render() {
    const { midiConnect } = this.props
    return (
      <div className="root-container">
        <h1>midiConnections</h1>
        <h2>{midiConnect.get('itemStatus')} - <span onClick={this.fetchAgain}>again</span></h2>
        <div className="device-list source">
          Select Source
          <div>{this.devices('source')}</div>
        </div>
        <div className="device-list target">
          Select Target
          <div>{this.devices('target')}</div>
        </div>
        <button onClick={this.connect}>Connect</button>
				<button onClick={this.disconnect}>Disconnect all</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  midiConnect: state.get('midiConnect')
})

export default connect(mapStateToProps, {
  fetchMidiConnections: midiConnectActions.fetchStart,
  createConnection: midiConnectActions.createConnectionStart,
	disconnect: midiConnectActions.disconnectStart
})(MidiConnect)

