import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Authentication from './components/Authentication';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route strict exact path="/" component={Dashboard}/>
          <Route strict exact path="/auth" component={Authentication}/>
        </div>
      </Router>
    );
  }
}

export default App;
