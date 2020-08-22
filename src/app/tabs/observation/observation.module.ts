import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';

import { ObservationComponent } from './observation.component';
import { ObservationCommentsComponent } from './observation-comments/observation-comments.component';
import { ObservationCurrentLocationComponent } from './observation-current-location/observation-current-location.component';
import { ObservationTreePicturesComponent } from './observation-tree-pictures/observation-tree-pictures.component';
import { ObservationTreeNameComponent } from './observation-tree-name/observation-tree-name.component';
import { ObservationService } from '@app/services/observation.service';

const routes: Routes = [
  {
    path: '',
    component: ObservationComponent
  }
];

@NgModule({
  declarations: [
    ObservationComponent,
    ObservationCurrentLocationComponent,
    ObservationTreeNameComponent,
    ObservationTreePicturesComponent,
    ObservationCommentsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ObservationService,
  ],
  entryComponents: [
    ObservationCurrentLocationComponent,
    ObservationTreeNameComponent,
    ObservationTreePicturesComponent,
    ObservationCommentsComponent,
  ]
})
export class ObservationPageModule { }
