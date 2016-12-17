import React, { Component } from 'react'

export default class AddNewMessage extends React.Component {
  render() {
    return (
      <div>
        <button
          className='submitBtn'
          disabled = {this.props.buttonDisabled}
          onClick={this.props.addNewMessage}>Submit
        </button>
      </div>
    )
  }
}
