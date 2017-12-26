import React, { Component } from 'react'
import { connect } from 'react-redux'

import { midiConnectActions } from 'actions'
import DeviceList from './DeviceList'

class MidiConnect extends Component {
  state = {
    source: null,
    target: null
  }

  componentDidMount() {
    const { fetchMidiConnections } = this.props
    fetchMidiConnections()
  }

  setPort = (type, port) => {
    this.setState({
      [type]: port
    })
  }

  disconnect = () => {
    const { disconnect } = this.props
    disconnect()
  }

  connect = () => {
    const { createConnection } = this.props
    const payload = {
      sourceId: this.state.source,
      targetId: this.state.target
    }
    createConnection(payload)
  }

  render() {
    const { devices, colors, createConnectionStatus } = this.props
    const { source, target } = this.state

    const creationStatus = createConnectionStatus.get('status')

    if (creationStatus === 'creating') {
      return (
        <div className="root-container">
          <h1>CREATING...</h1>
        </div>
      )
    } else if (creationStatus === 'error') {
      return (
        <div className="root-container">
          <h1>OOpppssss..</h1>
          {createConnectionStatus.get('error')}
        </div>
      )
    }
    return (
      <div className="root-container">
        <h1><a href="/">Midi Router</a></h1>
        <DeviceList
          type="source"
          devices={devices}
          onSetPort={this.setPort}
          source={source}
          target={target}
          colors={colors}
        />
        <DeviceList
          type="target"
          devices={devices}
          onSetPort={this.setPort}
          source={source}
          target={target}
          colors={colors}
        />
        <div className="buttons">
          <button className="red" onClick={this.disconnect}>Disconnect all</button>
          <button onClick={this.connect}>Connect</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const devices = state
    .getIn(['midiConnect', 'midiDevices'])
    .filter(device => device.get('name') !== 'System') || []

  const colors = {}
  devices.forEach(device => {
    device.get('ports').forEach(port => {
      colors[`${device.get('clientId')}:${port.get('portId')}`] = port.get('color')
    })
  })

  const createConnectionStatus = state.getIn(['midiConnect', 'createConnection'])

  return { devices, colors, createConnectionStatus }
}

export default connect(mapStateToProps, {
  fetchMidiConnections: midiConnectActions.fetchStart,
  createConnection: midiConnectActions.createConnectionStart,
  disconnect: midiConnectActions.disconnectStart
})(MidiConnect)

