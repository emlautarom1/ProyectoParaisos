import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgmCoreModule } from '@agm/core';

import { RegionMapPage } from './region-map.page';
import { SharedComponentsModule } from '@app/shared-components/shared-components.module';
import { PictureModalComponent } from '@app/shared-components/picture-modal/picture-modal.component';
import { RegionMapObservationDetailsComponent } from './region-map-observation-details/region-map-observation-details.component';

import { RepositoryService } from '@app/services/repository.service';
import { ExcelService } from '@app/services/excel.service';

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
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegionMapPage,
    RegionMapObservationDetailsComponent,
  ],
  providers: [
    RepositoryService,
    ExcelService,
  ],
  entryComponents: [
    RegionMapObservationDetailsComponent,
    PictureModalComponent,
  ]
})
export class RegionMapPageModule { }
