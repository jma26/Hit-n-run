import React, { Component } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div ref="spinner" className="dashboard_spinner">
          <p>Swervie</p>
          <span className="dashboard_spinner_outer-span">
            <div className="dashboard_spinner_inner-span">
            </div>
          </span>
        </div>
      </div>
    )
  }
}

export default Dashboard;
