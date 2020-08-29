import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureModalComponent } from './picture-modal/picture-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PictureModalComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class SharedComponentsModule { }
