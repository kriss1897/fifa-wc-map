import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { MapService } from './map.service';
import { MapBoxComponent } from './map-box/map-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService, MapService]
})
export class AppComponent implements OnInit {
  competitions: any = [];
  matches: any = [];
  selectedCompetition:any;
  stats: any;

  @ViewChild(MapBoxComponent)
  private mapBox: MapBoxComponent

  constructor(
    private dataService: DataService,
    private mapService: MapService,
  ){
    
  }

  ngOnInit(){
    this.mapService.year$.subscribe(x => console.log(x));
    this.dataService.getCompetitions().subscribe(_ => this.competitions = _);
    this.dataService.getStats().subscribe(_ => this.stats = _);
  }

  displayMatches(year){
    this.matches = [];
    this.dataService.getMatches(year)
      .subscribe(_ => this.matches = _);
  }

  updateSelectedCompetition(competition){
    this.selectedCompetition = competition;
    this.displayMatches(competition.year);
  }

  selectCompetitionYear(year){
    this.competitions.map(comp => comp.iterations.map(itr => {if(itr.year == year){this.selectedCompetition = itr}}));
    this.displayMatches(year);
  }

  goToStadium(match){
    let loc = match.stadium.location;
    this.mapBox.flyToStadium(match.stadium);
  }
}