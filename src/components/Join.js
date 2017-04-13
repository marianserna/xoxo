import React from 'react';
import base from '../base';
import { tokenize } from '../helpers';

export default class Join extends React.Component {
  componentDidMount() {
    const token = tokenize();
    base.update(`game/${this.props.params.gameId}`, {
      context: this,
      data: {player2Token: token}
    }).then(() => {
      this.context.router.transitionTo(`/game/${this.props.params.gameId}`);
    });
  }

  render() {
    return(
      <div className="loader">
        <p>Joining...</p>
      </div>
    )
  }
}

Join.contextTypes = {
  router: React.PropTypes.object
}
