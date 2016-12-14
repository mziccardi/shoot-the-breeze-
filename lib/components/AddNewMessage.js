import React, { Component } from 'react'

export default class AddNewMessage extends React.Component {
  render() {
    return (
      <div>
        <button
          className='AddNewMessageBtn'
          disabled = {this.props.buttonDisabled}
          onClick={this.props.addNewMessage}>Add New Message
        </button>
      </div>
    )
  }
}
