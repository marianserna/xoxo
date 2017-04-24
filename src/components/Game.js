import React from 'react';
import ScoreBoard from './ScoreBoard';
import Board from './Board';
import Turn from './Turn';
import Status from './Status';
import Chat from './Chat';
import base from '../base';
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

class Game extends React.Component {
  constructor() {
    super();
    this.recordTurn = this.recordTurn.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.token = localStorage.getItem('token');

    this.state = {
      game: false,
      showChat: false
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

  isMyTurn = () => {
    let playerNumber = 1;
    if (this.token === this.state.game.player2Token) {
      playerNumber = 2;
    }
    return playerNumber === this.state.game.turn;
  }

  recordTurn(cellNumber) {
    let game = {...this.state.game};
    if (game.board[cellNumber]) {
      return;
    }
    if (game.status !== 'playing') {
      return;
    }
    if (!this.isMyTurn()) {
      return;
    }
    game.board[cellNumber] = game.turn === 1 ? "X" : "O";
    game.turn = game.turn === 1 ? 2 : 1;
    game = this.checkWinner(game);
    this.setState({game});
  }

  toggleChat = (e) => {
    this.setState({
      showChat: !this.state.showChat
    });
  }

  resetBoard = () => {
    const game = {...this.state.game};
    for (let i = 1; i <= 9; i++) {
      game.board[i] = "";
    }
    game.status = "playing";
    game.statusMessage = "";
    this.setState({game});
  }

  sendChatMsg = (message) => {
    const timestamp = (new Date()).getTime();

    const newChat = {
      'playerNumber': this.playerNumber(),
      'senderName': this.playerName(),
      'message': message,
      'timestamp': timestamp
    }

    const newData = {...this.state.game.chat};
    newData[timestamp] = newChat;

    base.update(`game/${this.props.params.gameId}`, {
      context: this,
      data: {chat: newData}
    });
  }

  playerName = () => {
    if (this.token === this.state.game.player1Token) {
      return this.state.game.player1Name;
    } else {
      return this.state.game.player2Name;
    }
  }

  playerNumber = () => {
    return this.token === this.state.game.player1Token ? 1 : 2;
  }

  checkWinner(game) {
    const board = game.board;

    const winningCombos = [
      [board[1], board[2], board[3]],
      [board[4], board[5], board[6]],
      [board[7], board[8], board[9]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[3], board[6], board[9]],
      [board[1], board[5], board[9]],
      [board[3], board[5], board[7]]
    ];

    const xWon = winningCombos.some((combo) => {
      return combo.join('') === 'XXX';
    });

    if (xWon) {
      game.player1Wins += 1;
      game.statusMessage = `Rejoice! ${game.player1Name} has won! 🏆`;
    }

    const oWon = winningCombos.some((combo) => {
      return combo.join('') === 'OOO';
    });

    if (oWon) {
      game.player2Wins += 1;
      game.statusMessage = `Aleluya! ${game.player2Name} has won! 🍺`;
    }

    if (xWon || oWon) {
      game.status = "winner";
    } else {
      // check if board is full
      var emptyCell = 0;
      for (var cell in game.board) {
        if (game.board[cell] === "") {
          emptyCell++;
        }
      }
      if (emptyCell === 0) {
        game.status = "draw";
        game.statusMessage = "Shoot, Game Over...Sorry Losers 😂";
      }
    }

    return game;
  }

  render() {
    const {
      FacebookShareButton
    } = ShareButtons;

    const FacebookIcon = generateShareIcon('facebook');

    if(!this.state.game) {
      return (
        <div className="loader">
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <div className="container">
        <ScoreBoard player1Name={this.state.game.player1Name}
          player2Name={this.state.game.player2Name}
          player1Wins={this.state.game.player1Wins}
          player2Wins={this.state.game.player2Wins}
        >
          <Turn
            player1Name={this.state.game.player1Name}
            player2Name={this.state.game.player2Name}
            isMyTurn={this.isMyTurn()}
            turn={this.state.game.turn}
          />
        </ScoreBoard>

        <div className="gameArea">
          <div
            className="toggle-chat"
            onClick={(e) => this.toggleChat(e)}
          >
            {this.state.showChat ? 'GAME' : 'CHAT'}
          </div>

          <Board
            className="board"
            board={this.state.game.board}
            recordTurn={this.recordTurn}
          />

          <Chat
            className={`chat ${this.state.showChat ? 'chat-active' : ''}`}
            chat={this.state.game.chat}
            sendChatMsg={this.sendChatMsg}
          />
        </div>


        <Status
          status={this.state.game.status}
          statusMessage={this.state.game.statusMessage}
          resetBoard={this.resetBoard}
        />


        <FacebookShareButton
          url='https://xoxoreactgame.herokuapp.com/'
          title='xoxo Game'
          description ='Play the game of your life. Yes, of your life.' picture='https://xoxoreactgame.herokuapp.com/xoxo.jpg'
        >
          <FacebookIcon size={32} />
        </FacebookShareButton>
      </div>
    )
  }
}

export default Game;
