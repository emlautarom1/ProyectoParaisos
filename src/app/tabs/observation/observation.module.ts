import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgmCoreModule } from '@agm/core';

import { ObservationPage } from './observation.page';
import { TreeNameComponent } from './tree-name/tree-name.component';
import { GeolocationService } from 'src/app/services/geolocation.service';

const routes: Routes = [
  {
    path: '',
    component: ObservationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TreeNameComponent,
    ObservationPage
  ],
  entryComponents: [TreeNameComponent],
  providers: [GeolocationService]
})
export class ObservationPageModule { }
