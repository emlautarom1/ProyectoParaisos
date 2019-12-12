import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WikiPage } from './wiki.page';
import { PlaceholdersModule } from '@app/placeholders/placeholders.module';

const routes: Routes = [
  {
    path: '',
    component: WikiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PlaceholdersModule
  ],
  declarations: [WikiPage]
})
export class WikiPageModule { }
