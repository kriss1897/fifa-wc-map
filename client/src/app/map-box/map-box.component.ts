import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';

@Component({
  selector: 'app-marker',
  template: "<span style='background:black;height:10px;width:10px'>marker</span>",
})
export class Marker {
  constructor() {}
}

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
  providers: [MapService]
})
export class MapBoxComponent implements OnInit,OnChanges{
  // settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v10';
  lat = 13.932717;
  lng = -16.467999;
  zoom = 2;

  // data
  @Input() competitions: any = [];
  @Input() matches: any = [];
  markers:any = [];

  // constructor
  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.initializeMap();
  }

  ngOnChanges(){
    this.clearMarkers();
    // this.plotCompetitions(this.competitions);
    this.plotMatches(this.matches);
  }

  // initialize map
  private initializeMap() {
   this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [this.lat, this.lng],
      zoom: this.zoom,
    });
    // this.map.addControl(new mapboxgl.NavigationControl());

    // this.map.on('load',(event) => {
    //   this.matches.subscribe(matches => this.plotMatches(matches));
    //   this.competitions.subscribe(competitions => this.plotCompetitions(competitions));
    // });
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }

  plotMatches(matches){
    var coords = [];
    matches.map(match => {
        var marker = document.createElement('div')
        marker.className = '';
        marker.innerHTML = `<i class="material-icons">place</i><br/>`
        marker.addEventListener('click',function(){
          window.alert(match.home);
        })
        
        var loc = match.stadium.location;
        !!loc && coords.push([loc.lng,loc.lat]);
        !!loc && this.markers.push(new mapboxgl.Marker(marker).setLngLat([loc.lng,loc.lat]).addTo(this.map));
    });
    this.fitMap(coords);
  }

  plotCompetitions(competitions){
    var coords = [];
    competitions.map(competition => {
      var marker = document.createElement('div');
      marker.className = "competitionMarker";
      marker.innerHTML = `World Cup ${competition.year}`
      var loc = competition.location;

      marker.addEventListener('click',()=>{
        this.map.flyTo({
          center: [loc.lng,loc.lat]
        });
      });
      coords.push([loc.lng,loc.lat]);
      this.markers.push(new mapboxgl.Marker(marker).setLngLat([loc.lng,loc.lat]).addTo(this.map));
    })
    this.fitMap(coords);
  }

  clearMarkers(){
    this.markers.map(marker => marker.remove());
  }

  fitMap(markers){
    if(markers.length > 0){
      var minLng = Math.min.apply(null, markers.map(function (e) { return e[0]}))
      var minLat = Math.min.apply(null, markers.map(function (e) { return e[1]}))
      var maxLng = Math.max.apply(null, markers.map(function (e) { return e[0]}))
      var maxLat = Math.max.apply(null, markers.map(function (e) { return e[1]}))
      this.map.fitBounds([
        [minLng,minLat],
        [maxLng,maxLat],
      ],{padding:100});
    }
      
  }
}
