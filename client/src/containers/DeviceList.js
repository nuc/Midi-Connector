import React, { Component } from 'react'

import DevicePort from './DevicePort'

class DeviceList extends Component {
  setPort = portId => {
    const { type } = this.props
    this.props.onSetPort(type, portId)
  }
  renderDevices() {
    const {
      devices, colors, source, target, type
    } = this.props
    return devices.map(device => device.get('ports').map(devicePort =>
      (<DevicePort
        device={device}
        devicePort={devicePort}
        onSetPort={this.setPort}
        colors={colors}
        source={source}
        target={target}
        type={type}
      />)
    ))
  }

  render() {
    return (
      <div className="container">
        <h3>{this.props.type}</h3>
        <div className="device-list source">
          <div><ul>{this.renderDevices()}</ul></div>
        </div>
      </div>
    )
  }
}

export default DeviceList
