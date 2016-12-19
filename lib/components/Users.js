import React, { Component } from 'react'
export default class Users extends React.Component {
  constructor() {
    super(),
    this.state = {
      usersHash: {},
    }
  }
  showCurrentUsers() {
    // let userHash = {}
    // if(this.props.messages) {
    //   this.props.messages.map((e, i) => {
    //     userHash[e.user.displayName] =
    //       <ul key={i}>
    //         <li>
    //           <h2>{e.user.displayName}</h2>
    //         </li>
    //       </ul>
    //   })
    // }
    // return Object.values(userHash);
    let { messages } = this.props;
    let userList = {};
    if(messages) {
      messages.map((e,i) => {
        userList[e.user.displayName] =
          <p key={i}>{e.user.displayName}</p>
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
