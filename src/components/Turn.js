import React from 'react';

class Turn extends React.Component {
  render() {
    return(
      <div className="turn">
        {this.props.turn === 1 ? this.props.player1Name : this.props.player2Name}'s turn 
      </div>
    )
  }
}

export default Turn;
