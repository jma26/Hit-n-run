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
      reportedTime: '',
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
        // TODO: Take a random marker, or a marker near to the geolocation of the user and center the map on it
        center: [51.509865, -0.118092],
        zoom: 3,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
          }),
        ]
      }).on('moveend', () => {
        const card = document.getElementById('card');
        if(card) {
          card.style.transform = 'translateX(-110%)';
        }
      });
      this.placeMarkers();
    }, 750);
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
          // then call the MapQuest API to get the street name, then set it all in state
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
                  // This is the messiest way of getting a proper timestamp from the MySQL response, i am sorry lol.
                  const dateOne = this.state.currentIncident.reportedAt;
                  const dateTwo = dateOne.replace('T', ' ');
                  const dateThree = dateTwo.replace('.000Z', '');
                  const dateFour = new Date(Date.parse(dateThree));
                  let weekday = new Array(7);
                    weekday[0] =  "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";
                  const dayName = weekday[dateFour.getDay()];
                  const dateFive = `${dayName}, ${dateFour.getHours()}:${dateFour.getMinutes()}`;
                  this.setState({ reportedTime: dateFive });
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
      card = <Card location={this.state.streetName} reportedBy={this.state.currentIncident.reportedBy} reportedAt={this.state.reportedTime} />;
      setTimeout(() => {
        if(window.innerWidth > 768) {
          document.getElementById('card').style.transform = 'translateX(50%)';
        } else {
          document.getElementById('card').style.transform = 'translateX(0)';
        }
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
