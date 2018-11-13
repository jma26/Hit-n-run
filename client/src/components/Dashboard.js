import React, { Component } from 'react'

class Dashboard extends Component {

  componentDidMount = () => {
    const spinner = this.refs.spinner;
    setTimeout(() => {
      spinner.classList.add('dashboard__spinner--fade-out');
    }, 1300);
  }

  render() {
    return (
      <div className="dashboard">
        <div ref="spinner" className="dashboard__spinner">
          <p>Swervie</p>
          <span className="dashboard__spinner_outer-span">
            <div className="dashboard__spinner_inner-span">
            </div>
          </span>
        </div>
      </div>
    )
  }
}

export default Dashboard;
