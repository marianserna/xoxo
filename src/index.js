import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match } from 'react-router';

import './css/style.css';

import GameForm from './components/GameForm';
import Game from './components/Game';
import Waiting from './components/Waiting';
import Join from './components/Join';

const Root = () => {
  return(
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={GameForm} />
        <Match pattern="/game/:gameId" component={Game} />
        <Match pattern="/waiting/:gameId" component={Waiting} />
        <Match pattern="/join/:gameId" component={Join} />
      </div>
    </BrowserRouter>
  )
}

// Pass which component is to be rendered and where (div with id of main in index.html)
render(<Root/>, document.querySelector('#main'));
