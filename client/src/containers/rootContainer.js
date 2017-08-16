import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classname from 'classnames'

import { midiConnectActions } from 'actions'

class MidiConnect extends Component {

  state = {
    source: null,
    target: null
  }

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

  devicePortLI = (device, port, type) => {
    const { source, target } = this.state
    const portId = `${device.get('clientId')}:${port.get('portId')}`
    const isActive = portId === source && type === 'source' || portId === target && type === 'target'
    return (
      <li
        className={classname('device-port', { active: isActive })}
        onClick={this.select}
        data-device-type={type}
        data-device-port-id={portId}>
        {port.get('portName')}
      </li>
    )
  }

  devices(type) {
    const { midiConnect } = this.props
    const midiDevices = midiConnect.get('midiDevices')
    if (midiDevices.size) {
      return (
        <ul>
          {
            midiDevices.filter(device => device.get('name') !== 'System').map(device =>
              device.get('ports').map(
                port => this.devicePortLI(device, port, type)
              )
            )
          }
        </ul>
      )
    }
  }

  render() {
    const { midiConnect } = this.props
    return (
      <div className="root-container">
        <h1><a href="/">Midi Router</a></h1>
        <span className="refresh" onClick={this.fetchAgain}>↺</span>
        <div className="container">
          <h3>Source</h3>
          <div className="device-list source">
            <div>{this.devices('source')}</div>
          </div>
        </div>
        <div className="container">
          <h3>Target</h3>
          <div className="device-list target">
            <div>{this.devices('target')}</div>
          </div>
        </div>
        <div className="buttons">
          <button className="red" onClick={this.disconnect}>Disconnect all</button>
          <button onClick={this.connect}>Connect</button>
        </div>
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

