import React, { Component } from 'react'

class Users extends React.Component {
  constructor() {
    super(),
    this.state = {
      usersArray: [],
    }
  }

  showCurrentUsers() {
    let userArray = []
    if(this.state.messages) {
      this.state.messages.map((e, i) => {
        userArray.push(
          <ul key={i}>
            <li>
              {e.displayName}
              debugger
            </li>
          </ul>
    )
  })}
  return userArray
  }


  render() {
    return (
      <div>
        {this.showCurrentUsers()}
      </div>
    )
  }
}

module.exports = Users
