import React from 'react';

class ScoreBoard extends React.Component {
  render() {
    return(
      <div className="scoreBoard">
        <div className="players">
          <p className="player">
            {this.props.player1Name}: {this.props.player1Wins}
          </p>
          <p className="player">
            {this.props.player2Name}: {this.props.player2Wins}
          </p>
        </div>
        
        {this.props.children}
      </div>
    )
  }
}

export default ScoreBoard;
