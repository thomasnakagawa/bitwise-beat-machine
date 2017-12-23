import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import DrumMachine from "./components/DrumMachine/DrumMachine";
import URLParser from "./components/URLParser/URLParser";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Link to="/play/160-10010010-01101110-kad-hor-sxr">here</Link>
      </Route>
      <Route path="/play/:trackState" children={({match, history}) => (
        <URLParser match={match} history={history}>
          <DrumMachine/>
        </URLParser>
      )}/>
      <Redirect to="/"/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
