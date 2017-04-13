import React from 'react';

class Board extends React.Component {
  renderCells() {
    const cells = [];
    for (let i = 1; i <= 9; i++) {
      cells.push(
        <div className={`boardCell ${this.props.board[i]}`} key={i} onClick={(e) => {this.props.recordTurn(i)}}>
          <div className="letter">{this.props.board[i]}</div>
        </div>
      );
    }
    return cells;
  }

  render() {
    return(
      <div className="boardContainer">
        <div className="cells">
          {this.renderCells()}
        </div>
      </div>
    )
  }
}

export default Board;
