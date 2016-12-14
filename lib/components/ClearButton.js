import React, { Component } from 'react'

export default class ClearButton extends React.Component {
  render() {
    return(
      <div>
      <button
        className='clearBtn'
        disabled = {this.props.buttonDisabled}
        onClick={this.props.clearInputField}>Clear
      </button>
      </div>
    )
  }
}
