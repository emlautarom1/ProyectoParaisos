import { Component, OnInit } from '@angular/core';
import { LatLngLiteral } from '@agm/core';

import { GeolocationService } from '@app/services/geolocation.service';
import { ObservationService } from '@app/services/observation.service';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.scss'],
})
export class CurrentLocationComponent implements OnInit {
  constructor(
    private obsService: ObservationService,
    private geoService: GeolocationService
  ) { }

  ngOnInit() {
    // TODO: Add unsuscribe to onDestroy
    this.geoService.watchLocation().subscribe((pos: Position) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      const coords = { lat, lng };

      this.obsService.form.patchValue({ coords });
      this.geoService.latLngToAddress(lat, lng)
        .subscribe(addr => {
          this.obsService.form.patchValue({ direccion: addr });
        });
    });
  }

  get coords(): LatLngLiteral {
    return this.obsService.form.get('coords').value;
  }
}
