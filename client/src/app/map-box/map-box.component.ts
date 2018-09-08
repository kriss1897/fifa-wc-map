import { Component, OnInit, Input, OnChanges, EventEmitter, Output, Inject } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
  providers: [MapService]
})
export class MapBoxComponent implements OnInit,OnChanges{
  // settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/dark-v9';
  lat = 13.932717;
  lng = -16.467999;
  zoom = 1;
  private zoomThreshold = 3;

  // data
  @Input() competitions: any = [];
  @Input() matches: any = [];
  markers:any = [];

  // triggers
  @Output() competitionSelected = new EventEmitter<object>();

  // constructor
  constructor(
    private mapService: MapService,
    private selectYearBottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.initializeMap();
  }

  ngOnChanges(){
    this.clearMarkers();
    this.plotCompetitions(this.competitions);
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
      minZoom: 1,
    });
    
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load',(event) => {
      this.map.on('zoom',()=>{
        if(this.map.getZoom() > this.zoomThreshold){
          document.body.classList.add('zoomed')
          document.body.classList.remove('world')
        } else {
          document.body.classList.add('world')
          document.body.classList.remove('zoomed')
        }
      });
    });
  }

  flyTo(data) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }

  plotMatches(matches){
    let coords = [];
    let plotted = [];
    matches.map(match => {
      let loc = match.stadium.location;
      if(!!loc && plotted.indexOf(match.stadium._id) < 0){
        let marker = document.createElement('div')
        marker.className = 'matchMarker';
        marker.id = match.stadium._id;
        marker.innerHTML = `<img src="/assets/stadium.png" height="20px">`
        
        this.markers.push(new mapboxgl.Marker(marker).setLngLat([loc.lng,loc.lat]).addTo(this.map));
        coords.push([loc.lng,loc.lat]); plotted.push(match.stadium._id);
      }
    });
    this.fitMap(coords);
  }

  plotCompetitions(competitions){
    let coords = [];
    competitions.map(competition => {
        // Create the marker
        var marker = document.createElement('div');
        marker.className = "competitionMarker";
        marker.classList.add('mat-elevation-z2');
        let years = competition.iterations.map(itr => itr.year);
        marker.innerHTML = `${competition._id.country}:${years}`
        var loc = competition.location;

        marker.addEventListener('click',()=>{
          if(competition.iterations.length == 1){
            this.map.flyTo({
              center: [loc.lng,loc.lat],
              zoom: 3
            });
            this.competitionSelected.emit(competition.iterations[0]);
          }else if(competition.iterations.length > 1){
            let bottomSheet = this.selectYearBottomSheet.open(MapBoxSelectYear,{
              data: competition
            });
            bottomSheet.afterDismissed().subscribe(iteration => {
              this.competitionSelected.emit(iteration);
            });
          }
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

  flyToStadium(stadium){
    let loc = stadium.location;
    let marker = document.getElementById(stadium._id);
    // unselect other markers 
    let markers = document.getElementsByClassName('selectedMarker');
    for(let i=0;i<markers.length;i++) markers[i].classList.remove('selectedMarker');

    // select new marker
    marker.classList.add('selectedMarker');
    this.map.flyTo({
      center: [loc.lng,loc.lat],
      zoom: 7
    });
  }
}

@Component({
  selector: 'app-map-box-select-year',
  templateUrl: 'select-year.html'
})
export class MapBoxSelectYear {
  constructor(
    private elementRef: MatBottomSheetRef<MapBoxSelectYear>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data:any
  ){
    
  }

  selectIteration(itr){
    this.elementRef.dismiss(itr);
  }
}