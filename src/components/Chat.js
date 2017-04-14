import React from 'react';

export default class Chat extends React.Component {
  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      this.ul.scrollTop = this.ul.scrollHeight;
    }, 50);
  }

  detectEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onFormSubmit(e);
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const message = this.textarea.value;
    this.form.reset();
    this.props.sendChatMsg(message);
  }

  renderMessages = () => {
    if(!this.props.chat) return;

    let lastName = '';

    return Object.keys(this.props.chat).map((key) => {
      const message = this.props.chat[key];

      let sender = '';
      if (lastName !== message.senderName) {
        sender = <div className="chat-sender-name">{message.senderName}</div>
        lastName = message.senderName
      }

      return(
        <li key={key} className={`player-${message.playerNumber}`}>
          {sender}
          <span className="chat-message">{message.message}</span>
        </li>
      )

    });
  }

  render() {
    return(
      <div className="chat">
        <ul ref={(ul) => this.ul = ul}>
          {this.renderMessages()}
        </ul>
        <form className="chat-form" ref={(form) => this.form = form} onSubmit={(e) => this.onFormSubmit(e)}>
          <textarea placeholder="Type message..." ref={(textarea) => this.textarea = textarea} onKeyDown={(e) => this.detectEnter(e)}></textarea>
        </form>
      </div>
    )
  }
}
