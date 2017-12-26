import React, { Component } from 'react'

class DevicePort extends Component {
  setPort = () => {
    this.props.onSetPort(this.portId())
  }

  portId() {
    const { device, devicePort } = this.props
    return `${device.get('clientId')}:${devicePort.get('portId')}`
  }

  render() {
    const {
      devicePort, colors, source, target, type
    } = this.props
    let color
    if (target === this.portId() && type === 'target') {
      color = colors[target]
    }
    if (devicePort.get('connectedFrom') && type === 'target') {
      color = colors[devicePort.get('connectedFrom')]
    }
    if ((source === this.portId() || devicePort.get('connectingTo')) && type === 'source') {
      color = colors[this.portId()]
    }
    return (
      <li className="device-port" onClick={this.setPort} style={{ color }} >
        {devicePort.get('portName')}
      </li>
    )
  }
}

export default DevicePort
