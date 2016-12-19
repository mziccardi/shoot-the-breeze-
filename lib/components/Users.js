import React, { Component } from 'react'
export default class Users extends React.Component {
  constructor() {
    super(),
    this.state = {
      usersHash: {},
    }
  }
  showCurrentUsers() {
    let userHash = {}
    if(this.state.messages) {
      this.state.messages.map((e, i) => {
        userHash[e.displayName] =
          <ul key={i}>
            <li>
              <h2>{e.displayName}</h2>
            </li>
          </ul>
      })
    }
    return Object.values(userHash)
  }
  render() {
    return (
      <div>
        {this.showCurrentUsers()}
      </div>
    )
  }
}
