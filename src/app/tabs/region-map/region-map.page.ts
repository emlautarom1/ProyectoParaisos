import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { RegionMapSettingsComponent } from './region-map-settings/region-map-settings.component';

@Component({
  selector: 'app-region-map',
  templateUrl: './region-map.page.html',
  styleUrls: ['./region-map.page.scss'],
})
export class RegionMapPage {
  unslCoords = { lat: -33.292183, lng: -66.339610 };

  constructor(
    private modalCtrl: ModalController
  ) { }

  onDownload() {
    console.log('Descargando datos...');
  }

  async onFilterOptions() {
    const modal = await this.modalCtrl.create({
      component: RegionMapSettingsComponent
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log("Settings data: ", data);
  }
}
