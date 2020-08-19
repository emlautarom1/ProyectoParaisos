import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';

import { ObservationService } from '@app/services/observation.service';
import { ObservationCurrentLocationComponent } from './observation-current-location/observation-current-location.component';
import { ObservationTreePicturesComponent } from './observation-tree-pictures/observation-tree-pictures.component';
import { ObservationDetailsFormAddCommentComponent } from './observation-details-form/observation-details-form-add-comment/observation-details-form-add-comment.component';
import { ObservationDetailsFormComponent } from './observation-details-form/observation-details-form.component';
import { ObservationDetailsFormTreeNameComponent } from './observation-details-form/observation-details-form-tree-name/observation-details-form-tree-name.component';

const routes: Routes = [
  {
    path: 'current-location',
    component: ObservationCurrentLocationComponent,
  },
  {
    path: 'tree-pictures',
    component: ObservationTreePicturesComponent,
  },
  {
    path: 'details-form',
    component: ObservationDetailsFormComponent,
  },
  {
    path: '',
    redirectTo: 'current-location'
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ObservationCurrentLocationComponent,
    ObservationTreePicturesComponent,
    ObservationDetailsFormComponent,
    ObservationDetailsFormTreeNameComponent,
    ObservationDetailsFormAddCommentComponent,
  ],
  entryComponents: [
    ObservationDetailsFormTreeNameComponent,
    ObservationDetailsFormAddCommentComponent,
  ],
  providers: [ObservationService]
})
export class ObservationPageModule { }
