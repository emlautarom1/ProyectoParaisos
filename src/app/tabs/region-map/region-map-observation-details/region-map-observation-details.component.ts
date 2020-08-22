import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { ObservationDTO } from '@app/models/observation';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-region-map-observation-details',
  templateUrl: './region-map-observation-details.component.html',
  styleUrls: ['./region-map-observation-details.component.scss'],
})
export class RegionMapObservationDetailsComponent implements OnInit, OnDestroy {
  @Input() observation: ObservationDTO;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    history.pushState({ modal: true }, null);

    console.log("Details for: ", this.observation);
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
