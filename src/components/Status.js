import React from 'react'
import { Howl } from 'howler';

class Status extends React.Component {
  static propTypes = {
    status: React.PropTypes.string.isRequired,
    statusMessage: React.PropTypes.string.isRequired,
    resetBoard: React.PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.transitionSound = new Howl({
      src: ['/swoosh.mp3']
    });

    this.winnerSound = new Howl({
      src: ['/applause.mp3']
    });

    this.drawSound = new Howl({
      src: ['/failure.mp3']
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.status === nextProps.status) return;

    this.transitionSound.play();
    
    if (nextProps.status === 'winner') {
      setTimeout(() => {
        this.winnerSound.play();
      }, 500)
    } else if (nextProps.status === 'draw') {
      setTimeout(() => {
        this.drawSound.play();
      }, 500)
    }
  }

  render() {
    return(
      <div className={`statusContainer ${this.props.status}`}>
        <span>
          {this.props.statusMessage}
        </span>
        <button className="playAgain" onClick={(e) => {this.props.resetBoard()}}>
          Let's do it again!
        </button>
      </div>
    )
  }
}

export default Status;
