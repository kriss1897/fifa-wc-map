import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
  providers: [MapService]
})
export class MapBoxComponent implements OnInit {
  // settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/kriss1897/cjlm7ias536vx2ss944qunq0a';
  lat = -74.50;
  lng = 40;
  zoom: 4;
  message = 'Hello World!';

  // data
  source: any;
  markers: any;

  // constructor
  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.markers = [];
    this.initializeMap();
  }

  // initialize map
  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      });
    }

   this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [this.lat, this.lng],
      zoom: 3
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }
}
