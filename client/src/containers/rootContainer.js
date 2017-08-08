import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ReactComponent extends Component {

  static propTypes = {
    prop: PropTypes.string.isRequired
  }

  state = {

  }

  componentDidMount(props) {
    debugger
  }

  render() {
    return (
      <div>Root container</div>
    )
  }
}

export default ReactComponent
