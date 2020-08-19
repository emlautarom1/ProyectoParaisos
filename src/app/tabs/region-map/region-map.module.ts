import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgmCoreModule } from '@agm/core';

import { RegionMapPage } from './region-map.page';
import { RegionMapSettingsComponent } from './region-map-settings/region-map-settings.component';

const routes: Routes = [
  {
    path: '',
    component: RegionMapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegionMapPage,
    RegionMapSettingsComponent
  ],
  entryComponents: [
    RegionMapSettingsComponent
  ]
})
export class RegionMapPageModule { }
