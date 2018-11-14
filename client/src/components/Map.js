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
    this.placeMarkers = this.placeMarkers.bind(this);
  }

  componentDidMount() {
    this.fetchIncidents();
    this.map = L.map('map', {
      center: [37.4314311, -121.8819455],
      zoom: 13,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ]
    });
    setTimeout(() => {
      this.placeMarkers();
    }, 1000);
  }

  fetchIncidents() {
    axios.get('/api/incidents/all')
      .then(res => res.data)
      .then(data => this.setState({ incidents: data }));
  }

  placeMarkers() {
    const incidents = this.state.incidents;
    incidents.forEach(incident => {
      // Place a marker and add a tooltip onto it - TODO: Modify the tooltip even further
      L.marker([incident.latitude, incident.longitude]).addTo(this.map).bindPopup(`Reported by ${incident.User_id} at ${incident.time_of_accident}`);
    })
    console.log(`${incidents.length} Markers Placed`);
  }

  render() {
    return <div id="map"></div>
  }
}
export default Map;