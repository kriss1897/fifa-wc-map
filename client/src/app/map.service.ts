import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GeoJson, FeatureCollection } from './map';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {

  constructor(
    private http: HttpClient
  ) { 
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getCountries() {
    return this.http.get('http://localhost:3000/competitions');
  }
}
