import React from 'react';

class Board extends React.Component {
  renderCells() {
    const cells = [];
    for (let i = 1; i <= 9; i++) {
      cells.push(
        <div className="boardCell" key={i} onClick={(e) => {this.props.recordTurn(i)}}>
          {this.props.board[i]}
        </div>
      );
    }
    return cells;
  }

  render() {
    return(
      <div className="boardContainer">
        {this.renderCells()}
      </div>
    )
  }
}

export default Board;
