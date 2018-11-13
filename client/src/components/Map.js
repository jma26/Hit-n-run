import React, { Component } from 'react';
import L from 'leaflet';

class Map extends Component {

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
    
  }
  render() {
    return <div id="map"></div>
  }
}
export default Map;