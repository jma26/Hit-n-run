import React, { Component } from 'react';
import L from 'leaflet';
import axios from 'axios';

class Map extends Component {

  constructor() {
    super();
    this.state = {
      incidents: [],
      currentIncident: {
        userId: "",
        reportedAt: ""
      }
    };
    this.fetchIncidents = this.fetchIncidents.bind(this);
    this.placeMarkers = this.placeMarkers.bind(this);
  }

  componentDidMount() {
    this.fetchIncidents();
    setTimeout(() => {
      this.map = L.map('map', {
        // Fix the map centering
        center: [`${this.state.incidents[Math.floor(Math.random() * this.state.incidents.length)].latitude}`, `${this.state.incidents[Math.floor(Math.random() * this.state.incidents.length)].longitude}`],
        zoom: 3,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }),
        ]
      });
    }, 750);
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
      L.marker([incident.latitude, incident.longitude]).addTo(this.map).bindPopup(`Reported by ${incident.User_id} at ${incident.time_of_accident}`).addEventListener('click', (e) => {
        this.map.setView(e.target.getLatLng(), 13);
      });
    })
    console.log(`${incidents.length} Markers Placed`);
    setTimeout(() => {
      // Get data related to the marker - TODO: Show a card with details about the incident
      const poppers = document.getElementsByClassName('leaflet-marker-icon');
      for(let i = 0; i < poppers.length; i++) {
        poppers[i].addEventListener('click', () => {
          setTimeout(() => {
            const popper = document.getElementsByClassName('leaflet-popup-content')[0].innerHTML;
            const popperValues = popper.split(" ");
            this.setState({
              currentIncident: {
                userId: popperValues[2],
                reportedAt: popperValues[4]
              }
            })
          }, 250);
        });
      }
    }, 2000);
  }

  render() {
    return <div id="map"></div>
  }
}
export default Map;