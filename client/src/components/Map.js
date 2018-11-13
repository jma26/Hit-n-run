import React, { Component } from 'react';
import L from 'leaflet';
import axios from 'axios';

class Map extends Component {

  constructor() {
    super();
    this.state = {
      incidents: []
    };
    this.fetchIncidents = this.fetchIncidents.bind(this);
  }

  componentDidMount() {
    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ]
    });
    this.fetchIncidents();
  }

  fetchIncidents() {
    axios.get('http://localhost:8000/api/incidents/all')
      .then(res => console.log(res.data))
  }

  render() {
    return <div id="map"></div>
  }
}
export default Map;