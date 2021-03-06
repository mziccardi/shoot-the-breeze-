import React, {Component} from 'react'

export default class MessageList extends React.Component {
  render() {
    return(
      <ul>
        { this.props.messages.map(m => <li key={m.key}>
          <span>
            {m.createdAt}
          </span>
          <span
            className='display-name'>
            <strong> {m.user.displayName.split(' ')[0]}</strong>
          </span>
            <br/>{m.content}</li>) }
      </ul>
    )
  }
}
