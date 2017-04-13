import React from 'react';

export default class Chat extends React.Component {
  renderMessages = () => {
    return Object.keys(this.props.chat).map((key) => {
      const message = this.props.chat[key];
      return (
        <li key={key}>
          {message.senderName}
          <br/>
          {message.message}
        </li>
      )
    });
  }

  render() {
    return(
      <div className="chat">
        <ul>
          {this.renderMessages()}
        </ul>
      </div>
    )
  }
}
