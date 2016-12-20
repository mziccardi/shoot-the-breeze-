import React, { Component } from 'react'
import firebase, { reference, signIn, signOut } from '../firebase';
import { pick, map, extend } from 'lodash';
import moment from 'moment';
import ClearButton from './ClearButton'
import AddNewMessage from './AddNewMessage'
import Users from './Users'
import FilterBar from './FilterBar'
import MessageList from './MessageList'


export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      draftMessage: '',
      user: null,
      users: [],
      usersHash: {},
      filterText:'',
      filteredMessages: null,
      filterUser: null,
    }


    this.addNewMessage = this.addNewMessage.bind(this)
    this.clearInputField = this.clearInputField.bind(this)
    this.filterMessages = this.filterMessages.bind(this)
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

  sort() {
    let reverse = true;
    let reverseMessage = this.state.messages.reverse(reverse = false)
    this.setState({ messages: reverseMessage })
  }

  addNewMessage() {
    const { user, draftMessage } = this.state;
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

  filterMessages(e){
    let filterInput = e.target.value
    let filterArray = this.state.messages.filter((object, index, array) => {
      if (object.content.includes(filterInput)){
        return object
      }
    })
    this.setState({filterMessages: e ? filterArray : null})
  }

  filterUserByMessage(e) {
    this.setState({filterUser: e.target.innerHTML})
  }


  render() {
    const { user, messages, draftMessage, filterText } = this.state;

    let buttonDisabled = false;
      if (!draftMessage || draftMessage.length > 140) {
      buttonDisabled = true;
      }
    return (
      <div className="Application">
        <div>
        <FilterBar
          filterMessages = {this.filterMessages}
          sort = {this.sort.bind(this)}
        />
      </div>
        <MessageList messages = { this.state.filterMessages ? this.state.filterMessages : this.state.messages}/>
        <ul className="users">Users
            <Users messages={this.state.messages}
                  filterUserByMessage={this.filterUserByMessage.bind(this)}
                />
        </ul>
        {user ?
          <div>
            <p className='user-greeting'>Logged in as <strong>{user.displayName.split(' ')[0]}</strong><span> ({user.email})</span></p>
          <section className='wrap'>
            <input
              className="message"
              placeholder="Message…"
              value={this.state.draftMessage}
              onChange={(e) => this.setState({ draftMessage: e.target.value })}
            />
        <span><div className="MessageInput">
          <AddNewMessage
            buttonDisabled = {buttonDisabled}
            addNewMessage = {this.addNewMessage}
          />
          <ClearButton
            buttonDisabled = {buttonDisabled}
            clearInputField = {this.clearInputField}
          />
          <p id='character-count'>{140 - this.state.draftMessage.length}</p>
        </div></span>
        </section>

        <button onClick={() => signOut()}>Sign Out</button>
      </div>
      :<button onClick={() => signIn()}>Login</button> }
      </div>
    )
  }
}
