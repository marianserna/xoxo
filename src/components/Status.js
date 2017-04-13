import React from 'react'

class Status extends React.Component {
  render() {
    return(
      <div className="statusContainer">
        {this.props.statusMessage}
        <button className="playAgain" onClick={(e) => {this.props.resetBoard()}}>
        </button>
      </div>
    )
  }
}

export default Status;
