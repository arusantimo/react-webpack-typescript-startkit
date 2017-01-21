import * as React from 'react';
import Main from "./main";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
export default class App extends React.Component<any, any> {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Main} >
          <IndexRoute component={Main}/>
        </Route>
      </Router>
    );
  }
}