import React, { Component } from 'react'
import firebase, { reference, signIn, signOut } from '../firebase';
import { pick, map, extend } from 'lodash';
import moment from 'moment';
import ClearButton from './ClearButton'
import AddNewMessage from './AddNewMessage'


export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      draftMessage: '',
      user: null,
      users: [],
    }

    // this.showUser = this.showUser.bind(this)
    this.sort = this.sort.bind(this)
    this.addNewMessage = this.addNewMessage.bind(this)
    this.clearInputField = this.clearInputField.bind(this)
  }

  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key }))
      });
    });

    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  // showUser() {
  //   this.state.messages.filter((e, i, self ) => {
  //     return(<li key={key}>{user.displayName}</li>)
  //   })
  // }

  sort() {
    let reverse = true;
    let reverseMessage = this.state.messages.reverse(reverse = false)
    this.setState({ messages: reverseMessage })
  }

  addNewMessage() {
    const { user, draftMessage } = this.state;
    debugger
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid'),
      content: draftMessage,
      createdAt: moment().format('MMMM Do, h:mm a')
    });
      this.setState({ draftMessage: ''})
    }

  clearInputField() {
    this.setState({ draftMessage: ''})
  }
  render() {
    const { user, messages, draftMessage } = this.state;

    let buttonDisabled = false;
    if (!draftMessage || draftMessage.length > 140) {
      buttonDisabled = true;
    }

    return (
      <div className="Application">
        {user ?
        <div>
          <p>Logged in as <strong>{user.displayName.split(' ')[0]}</strong><span> ({user.email})</span></p>
           <button onClick={this.sort}>Sort</button>
           <button onClick={() => signOut()}>Sign Out</button>
         </div>
           :<button onClick={() => signIn()}>Login</button> }
        <ul>
          { this.state.messages.map(m => <li key={m.key}>{m.createdAt}<br/> {m.user.displayName}: {m.content}</li>) }
        </ul>
        <ul>
            <li>Users</li>
            {this.state.messages.map(m => <li key={m.key}>{m.user.displayName}</li>)}
        </ul>
        <div className="MessageInput">
          <input
            placeholder="Message…"
            value={this.state.draftMessage}
            onChange={(e) => this.setState({ draftMessage: e.target.value })}
          />
          <p id='character-count'>Character Count: {140 - this.state.draftMessage.length}</p>
          <AddNewMessage
            buttonDisabled = {buttonDisabled}
            addNewMessage = {this.addNewMessage}
          />
          <ClearButton
            buttonDisabled = {buttonDisabled}
            clearInputField = {this.clearInputField}
          />
        </div>
      </div>
    )
  }
}
