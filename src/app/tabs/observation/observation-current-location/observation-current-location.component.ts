import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservationService } from '@app/services/observation.service';
import { GeolocationService } from '@app/services/geolocation.service';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-observation-current-location',
  templateUrl: './observation-current-location.component.html',
  styleUrls: ['./observation-current-location.component.scss'],
})
export class ObservationCurrentLocationComponent implements OnInit, OnDestroy {
  constructor(
    private obsService: ObservationService,
    private geoService: GeolocationService
  ) { }

  ngOnInit() {
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

  ngOnDestroy() {
    // TODO: Add unsuscribe to onDestroy
  }

  get coords(): LatLngLiteral {
    return this.obsService.form.get('coords').value;
  }
}
