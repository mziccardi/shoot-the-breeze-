import React, { Component } from 'react'
export default class Users extends React.Component {
  constructor() {
    super(),
    this.state = {
      usersHash: {},
    }
  }
  showCurrentUsers() {
    let { messages } = this.props;
    let userList = {};
    if(messages) {
      messages.map((e,i) => {
        userList[e.user.displayName] =
          <p onClick={this.props.filterUserByMessage} key={i}>{e.user.displayName}</p>
      })
    }
    return Object.values(userList);
  }
  render() {
    return (
      <div>
        {this.showCurrentUsers()}
      </div>
    )
  }
}
