import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Map from './Map';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Navbar />
        <Map />
      </div>
    )
  }
}

export default Dashboard;
