import React from 'react';
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

class ScoreBoard extends React.Component {
  render() {
    const {
      FacebookShareButton
    } = ShareButtons;

    const FacebookIcon = generateShareIcon('facebook');

    return(
      <div className="scoreBoard">
        <p className="player">
          {this.props.player1Name}: {this.props.player1Wins}
        </p>
        <p className="player">
          {this.props.player2Name}: {this.props.player2Wins}
        </p>
        <FacebookShareButton
          url='https://xoxoreactgame.herokuapp.com/'
          title='xoxo Game'
          description ='Play a game you will never forget' picture='https://xoxoreactgame.herokuapp.com/xoxo-img.png'
        >
          <FacebookIcon size={32} />
        </FacebookShareButton>
      </div>
    )
  }
}

export default ScoreBoard;
