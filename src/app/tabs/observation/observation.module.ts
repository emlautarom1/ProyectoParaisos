import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';

import { CurrentLocationComponent } from './steps/current-location/current-location.component';
import { TreePicturesComponent } from './steps/tree-pictures/tree-pictures.component';
import { DetailsFormComponent } from './steps/details-form/details-form.component';
import { TreeNameComponent } from './steps/details-form/tree-name/tree-name.component';
import { AddCommentComponent } from './steps/details-form/add-comment/add-comment.component';

import { FormDataService } from '@app/services/observation/form-data.service';

const routes: Routes = [
  {
    path: 'current-location',
    component: CurrentLocationComponent,
  },
  {
    path: "tree-pictures",
    component: TreePicturesComponent,
  },
  {
    path: "details-form",
    component: DetailsFormComponent,
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
    CurrentLocationComponent,
    TreePicturesComponent,
    DetailsFormComponent,
    TreeNameComponent,
    AddCommentComponent,
  ],
  entryComponents: [
    TreeNameComponent,
    AddCommentComponent
  ],
  providers: [FormDataService]
})
export class ObservationPageModule { }
