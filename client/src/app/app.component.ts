import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  competitions: any = [];
  matches: any = [];
  selectedCompetition:any;
  constructor(
    private dataService: DataService
  ){

  }

  ngOnInit(){
    this.dataService.getCompetitions().subscribe(_ => this.competitions = _);
  }

  displayMatches(){
    this.matches = [];
    this.dataService.getMatches(this.selectedCompetition.year)
      .subscribe(_ => this.matches = _);
  }
}