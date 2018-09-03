import { Component } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MapService]
})
export class AppComponent {
  title = 'app';
}