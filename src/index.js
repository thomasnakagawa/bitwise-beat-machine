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
        <Link to="/play/80-10010101-11001101-kad-hor-sno">here</Link>
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
