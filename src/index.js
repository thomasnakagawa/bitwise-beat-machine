import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import DrumMachine from "./components/DrumMachine/DrumMachine";
import URLParser from "./components/URLParser/URLParser";
import Constants from './constants';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/:trackState" children={({match, history}) => (
        <URLParser match={match} history={history}>
          <DrumMachine/>
        </URLParser>
      )}/>
      <Redirect to={Constants.DEFAULT_URL}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
