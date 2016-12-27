import React from 'react';
import ScoreBoard from './ScoreBoard';
import Board from './Board';
import Turn from './Turn';
import base from '../base';

class Game extends React.Component {
  constructor() {
    super();
    this.recordTurn = this.recordTurn.bind(this);
    this.checkWinner = this.checkWinner.bind(this);

    this.state = {
      game: false
    }
  }

  componentWillMount() {
    this.ref = base.syncState(
      `game/${this.props.params.gameId}`,
      {
        context: this,
        state: 'game'
      }
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  recordTurn(cellNumber) {
    const game = {...this.state.game};
    if (game.board[cellNumber]) {
      return;
    }
    game.board[cellNumber] = game.turn === 1 ? "X" : "O";
    game.turn = game.turn === 1 ? 2 : 1;
    this.setState({game});
    this.checkWinner();
  }

  checkWinner() {
    
  }

  render() {

    if(!this.state.game) {
      return (
        <p>Loading...</p>
      )
    }

    return (
      <div className="container">
        <ScoreBoard player1Name={this.state.game.player1Name}
          player2Name={this.state.game.player2Name}
          player1Wins={this.state.game.player1Wins}
          player2Wins={this.state.game.player2Wins}
        />
        <Board board={this.state.game.board}
          recordTurn={this.recordTurn}
        />
        <Turn player1Name={this.state.game.player1Name}
          player2Name={this.state.game.player2Name}
          turn={this.state.game.turn}
        />
      </div>
    )
  }
}

export default Game;
