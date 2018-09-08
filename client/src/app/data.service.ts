import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient
  ) { 
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getCompetitions() {
    return this.http.get(`${environment.url}/competitions`);
  }

  getMatches(year: Number){
    return this.http.get(`${environment.url}/matches/year/${year}`);
  }

  getStats(){
    return this.http.get(`${environment.url}/competitions/stats`);
  }
}
