import React, { Component } from 'react';
import L from 'leaflet';
import axios from 'axios';
import Card from './layout/Card';
import mapquest from '../config/keys';

class Map extends Component {

  constructor() {
    super();
    this.state = {
      incidents: [],
      currentIncident: {
        location: [],
        reportedBy: "",
        reportedAt: ""
      },
      streetName: '',
      isPrepared: false
    };
    this.fetchIncidents = this.fetchIncidents.bind(this);
    this.placeMarkers = this.placeMarkers.bind(this);
    this.getMarkerData = this.getMarkerData.bind(this);
  }

  componentDidMount() {
    this.fetchIncidents();
    setTimeout(() => {
      this.map = L.map('map', {
        // Take a random marker from the state and center the map on it
        center: [51.509865, -0.118092],
        zoom: 3,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
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
      // Place a marker and add a tooltip onto it
      L.marker([incident.latitude, incident.longitude]).addTo(this.map).bindPopup(`Reported by ${incident.User_id} at ${incident.time_of_accident}`).addEventListener('click', (e) => {
        this.map.setView(e.target.getLatLng(), 20);
      });
    })
    console.log(`${incidents.length} Markers Placed`);
    setTimeout(() => {
      // Get data related to the marker
      this.getMarkerData();
    }, 2000);
  }

  getMarkerData() {
    const poppers = document.getElementsByClassName('leaflet-marker-icon');
    for(let i = 0; i < poppers.length; i++) {
      poppers[i].addEventListener('click', () => {
        setTimeout(() => {
          // By clicking on the marker, take it's data, call the API to get the user's name via the ID,
          // then call the GeoNames API to get the street name, then set it all in state
          const popper = document.getElementsByClassName('leaflet-popup-content')[0].innerHTML;
          const popperValues = popper.split(" ");
          axios.get(`/api/auth/username/${popperValues[2]}`)
            .then(res => res.data)
            .then(data => {
              this.setState({ currentIncident: {location: [this.state.incidents[i].latitude, this.state.incidents[i].longitude], reportedBy: data, reportedAt: popperValues[4]} });
                axios.get(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${mapquest.key}&location=${this.state.currentIncident.location[0]},${this.state.currentIncident.location[1]}&includeRoadMetadata=true&includeNearestIntersection=true`)
                .then(res => res.data)
                .then(data => {
                  const results = data.results[0].locations;
                  const streetName = results[0].street;
                  this.setState({ streetName: streetName, isPrepared: true});
                  }
                );
              })
        }, 250);
      });
    }
  }

  render() {
    const isPrepared = this.state.isPrepared;
    let card; 
    if(isPrepared === true) {
      card = <Card location={this.state.streetName} reportedBy={this.state.currentIncident.reportedBy} reportedAt={this.state.currentIncident.reportedAt} />;
      setTimeout(() => {
        document.getElementById('card').style.display = 'flex';
      }, 250);
    }
    return (
      <div>
        <div id="map"></div>
        {card}
      </div>
    )
  }
}
export default Map;
