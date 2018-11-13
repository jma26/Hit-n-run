import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Map from './Map';

class Dashboard extends Component {

  componentDidMount = () => {
    const spinner = this.refs.spinner;
    setTimeout(() => {
      spinner.classList.add('dashboard__spinner--fade-out');
    }, 1300);
    spinner.style.display = 'none';
  }

  render() {
    return (
      <div className="dashboard">
        <div ref="spinner" className="dashboard__spinner">
          <p className="dashboard__spinner__text">Swervie</p>
          <span className="dashboard__spinner__outer-span">
            <div className="dashboard__spinner__inner-span">
            </div>
          </span>
        </div>
        <Navbar />
        <Map />
      </div>
    )
  }
}

export default Dashboard;
