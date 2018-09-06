import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {

  constructor(
    private http: HttpClient
  ) { 
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getCompetitions() {
    return this.http.get('http://localhost:3000/competitions');
  }

  getMatches(){
    return this.http.get('http://localhost:3000/matches/year/2014');
  }
}
