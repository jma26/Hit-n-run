import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Dashboard}/>
      </Router>
    );
  }
}

export default App;
