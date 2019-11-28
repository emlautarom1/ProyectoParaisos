import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.page.html',
  styleUrls: ['./observation.page.scss'],
})
export class ObservationPage implements OnInit {
  coords: Coordinates;

  constructor(private geo: GeolocationService) { }

  ngOnInit() {
    this.geo.watchLocation().subscribe((pos: Position) => {
      this.coords = pos.coords;
    });
  }

}
