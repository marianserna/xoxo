import React from 'react';

class Turn extends React.Component {
  static propTypes ={
    turn: React.PropTypes.number.isRequired,
    isMyTurn: React.PropTypes.bool.isRequired,
    player1Name: React.PropTypes.string.isRequired,
    player2Name: React.PropTypes.string.isRequired
  }
  render() {
    return(
      <div className={`turn ${this.props.isMyTurn ? 'my-turn' : ''}`}>
        {this.props.turn === 1 ? this.props.player1Name : this.props.player2Name}'s turn
      </div>
    )
  }
}

export default Turn;
