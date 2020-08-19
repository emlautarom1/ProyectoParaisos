import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-region-map-settings',
  templateUrl: './region-map-settings.component.html',
  styleUrls: ['./region-map-settings.component.scss'],
})
export class RegionMapSettingsComponent implements OnInit, OnDestroy {
  constructor(
    private modalCtrl: ModalController
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
  onDissmiss() {
    this.modalCtrl.dismiss();
  }
}
