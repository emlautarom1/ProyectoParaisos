import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import LatLngLiteral = google.maps.LatLngLiteral;
import MapOptions = google.maps.MapOptions;


@Component({
  selector: 'app-observation-current-location',
  templateUrl: './observation-current-location.component.html',
  styleUrls: ['./observation-current-location.component.scss'],
})
export class ObservationCurrentLocationComponent implements OnInit, OnDestroy {
  @Input() coords: LatLngLiteral;
  mapOptions!: MapOptions;

  constructor(
    public mapsService: GoogleMapsService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    history.pushState({ modal: true }, null);
    this.mapOptions = {
      disableDefaultUI: true,
      zoom: 20,
      center: this.coords,
      mapTypeId: 'hybrid'
    };
  }

  ngOnDestroy() {
    if (history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate')
  onReturn() {
    this.modalCtrl.dismiss();
  }
}
