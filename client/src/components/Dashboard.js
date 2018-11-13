import React, { Component } from 'react';
import Navbar from './layout/Navbar';

class Dashboard extends Component {

  componentDidMount = () => {
    setTimeout(() => {
      const spinner = this.refs.spinner;
      spinner.classList.add('dashboard__spinner--fade-out');
    }, 1300);
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
        <div id="map"></div>
      </div>
    )
  }
}

export default Dashboard;
