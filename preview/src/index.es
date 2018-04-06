import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';


const rootNode = document.getElementById('root');

const App = (
  <HashRouter>
    <Switch>
      <Route path="/" exact component={require('./containers/home').default} />
      <Route path="*" component={require('./containers/error_404').default} />
    </Switch>
  </HashRouter>
);

render(App, rootNode);
