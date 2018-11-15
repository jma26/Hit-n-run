import React, { Component } from 'react';
import Spinner from './layout/Spinner';
import Navbar from './layout/Navbar';
import Map from './Map';

class Dashboard extends Component {

  componentDidMount() {
    const spinner = document.getElementById('spinner');
    setTimeout(() => {
      spinner.classList.add('spinner--fade-out');
    }, 1300);
    setTimeout(() => {
      spinner.style.display = 'none';
    }, 2000);
  }
  
  render() {
    return (
      <div>
        <Spinner />
        <div className="dashboard">
          <Navbar />
          <Map />
        </div>
      </div>
    )
  }
}

export default Dashboard;
