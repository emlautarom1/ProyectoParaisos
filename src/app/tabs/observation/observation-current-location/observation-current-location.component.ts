import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { LatLngLiteral } from '@agm/core';


@Component({
  selector: 'app-observation-current-location',
  templateUrl: './observation-current-location.component.html',
  styleUrls: ['./observation-current-location.component.scss'],
})
export class ObservationCurrentLocationComponent implements OnInit, OnDestroy {
  @Input() coords: LatLngLiteral;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    history.pushState({ modal: true }, null);
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
