import React, { Component } from 'react';
import Navbar from './layout/Navbar';

class Authentication extends Component {
  render() {
    return (
      <div className="authentication">
        <Navbar />
        <h1>Authentication</h1>
      </div>
    )
  }
}

export default Authentication;
