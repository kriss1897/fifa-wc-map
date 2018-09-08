import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MapService {

  private year = new Subject<object>();

  constructor() { 
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  year$ = this.year.asObservable();

  public setYear(year: object){
    return this.year.next(year);
  }
}
