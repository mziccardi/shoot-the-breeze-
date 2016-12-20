import React, { Component } from 'react'
import firebase, { reference, signIn, signOut } from '../firebase';
import { pick, map, extend } from 'lodash';
import moment from 'moment';
import ClearButton from './ClearButton'
import AddNewMessage from './AddNewMessage'
import Users from './Users'
import FilterBar from './FilterBar'


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
      userFilter:null,
      filteredMessages: null,
    }

    // this.showCurrentUser = this.showCurrentUser.bind(this)
    // this.filterUsers = this.filterUsers.bind(this)
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

    // let matches = this.state.messages//.[0].users.displayName;
    //   matches.filter((user) => {



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

//   updateSearch(e){
//     this.setState({filterText: e.target.value})
// }
  filterMessages(e){
    let filterInput = e.target.value
    let filterArray = this.state.messages.filter((object, index, array) => {
      if (object.content.includes(filterInput)){
        return object
      }
    })
    console.log(filterArray)
  }
  setUsersState(e){
    this.setState({userFilter:e.target.value})
  }

  filterMessageByUser(){

    let filterMessagesByUser = this.state.messages.filter((object, index, array) => {
      if (object.user.displayName === this.state.userFilter ){
        return object
      }
    })
    console.log(filterArray)
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
          filterMessages = {this.filterMessages.bind(this)}
          // updateSearch = {this.filterMessages.bind(this)}
          sort = {this.sort.bind(this)}
        />
      </div>
        <ul>
          { this.state.messages.map(m => <li key={m.key}>
            <span>
              {m.createdAt}
            </span>
            <span
              className='display-name'>
              <strong> {m.user.displayName.split(' ')[0]}</strong>
            </span>
              <br/>{m.content}</li>) }
        </ul>
        <ul className="users">Users
            <Users
                setstate= {this.setUsersState.bind(this)}
               filter = {this.filterMessageByUser.bind(this)}
               messages={this.state.messages} />
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
