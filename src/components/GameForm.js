import React from 'react';
import { generateUUID, tokenize } from '../helpers';
import base from '../base';

class GameForm extends React.Component {
  constructor() {
    super();
    this.saveInitialToDb = this.saveInitialToDb.bind(this);
  }

  goToGame(e) {
    e.preventDefault();
    const player1 = this.player1Input.value;
    const player2 = this.player2Input.value;
    const board = {};
    for (var i = 1; i <= 9; i++) {
      board[i] = "";
    }

    const initialInfo = {
      player1Name: player1,
      player2Name: player2,
      player1Token: tokenize(),
      player2Token: '',
      player1Wins: 0,
      player2Wins: 0,
      turn: 1,
      board: board,
      chat: {},
      status: "playing",
      statusMessage: ""
    }

    const gameId = generateUUID();

    this.saveInitialToDb(initialInfo, gameId);
  }

  saveInitialToDb(initialInfo, gameId) {
    base.post(`game/${gameId}`, {
      data: initialInfo
    }).then(() => {
      this.context.router.transitionTo(`/waiting/${gameId}`);
    });
  }

  render() {
    return (
      <div className="form-container">
        <form className="gameForm" onSubmit={(e) => {this.goToGame(e)}}>
          <div className="player-input">
            <input ref={(input) => {this.player1Input = input}} type="text" placeholder="Player 1" name="player1"/>
          </div>
          <div className="player-input">
            <input ref={(input) => {this.player2Input = input}} type="text" placeholder="Player 2" name="player2"/>
          </div>
          <button type="submit">START</button>
        </form>
      </div>
    )
  }
}

GameForm.contextTypes = {
  router: React.PropTypes.object
}

export default GameForm;
