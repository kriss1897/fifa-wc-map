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
  // style = 'mapbox://styles/kriss1897/cjlm7ias536vx2ss944qunq0a';
  style = 'mapbox://styles/mapbox/light-v9';
  lat = -74.50;
  lng = 40;
  zoom = 2;
  message = 'Hello World!';

  // data
  source: any;
  markers: any;

  // constructor
  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.markers = [];
    this.initializeMap();
    this.source = this.mapService.getCountries();
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
      zoom: this.zoom,
      minZoom:2
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load',(event) => {

      this.source.subscribe(points => {
        console.log(points);
        this.map.addSource('countries',{
          type: 'geojson',
          data: points
        });

        points.features.map(point => {
          console.log(point.properties.flag);
          var images = {}
          this.map.loadImage('./'+point.properties.flag, (error, image) => {
            this.map.addImage(point.properties.code, image); 
          });
        })

        this.map.addLayer({
          id: 'countries',
          source: 'countries',
          type: 'symbol',
          layout: {
            'text-field': '{name}',
            'text-size': 12,
            'icon-image': '{code}',
            'icon-size': 1,
            'text-offset': [0, 1.5]
          },
          paint: {
            'text-color': '#f16624',
          }
        })
      });      
    });

  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }
}
