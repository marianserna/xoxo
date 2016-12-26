import React from 'react';

class GameForm extends React.Component {
  goToGame(e) {
    e.preventDefault();
    // this.context.router.transitionTo(`/store/${storeId}`);
    const player1 = this.player1Input.value;
    const player2 = this.player2Input.value;
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
