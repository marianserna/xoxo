import React from 'react';
import { generateUUID } from '../helpers';
import base from '../base';

class GameForm extends React.Component {
  constructor() {
    super();
    this.saveInitialToDb = this.saveInitialToDb.bind(this);
  }

  goToGame(e) {
    e.preventDefault();
    // this.context.router.transitionTo(`/store/${storeId}`);
    const player1 = this.player1Input.value;
    const player2 = this.player2Input.value;
    const board = {};
    for (var i = 1; i <= 9; i++) {
      board[i] = "";
    }

    const initialInfo = {
      player1Name: player1,
      player2Name: player2,
      player1Wins: 0,
      player2Wins: 0,
      turn: 1,
      board: board
    }

    const gameId = generateUUID();

    this.saveInitialToDb(initialInfo, gameId);
  }

  saveInitialToDb(initialInfo, gameId) {
    base.post(`game/${gameId}`, {
      data: initialInfo
    }).then(() => {
      this.context.router.transitionTo(`/game/${gameId}`);
    });
  }

  render() {
    return (
      <form className="gameForm" onSubmit={(e) => {this.goToGame(e)}}>
        <label htmlFor="player1">Player 1</label>
        <input ref={(input) => {this.player1Input = input}} type="text" name="player1"/>
        <label htmlFor="player2">Player 2</label>
        <input ref={(input) => {this.player2Input = input}} type="text" name="player2"/>
        <button type="submit">Start</button>
      </form>
    )
  }
}

GameForm.contextTypes = {
  router: React.PropTypes.object
}

export default GameForm;
