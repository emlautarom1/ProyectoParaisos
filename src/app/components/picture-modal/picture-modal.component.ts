import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-picture-modal',
  templateUrl: './picture-modal.component.html',
  styleUrls: ['./picture-modal.component.scss'],
})
export class PictureModalComponent {
  @Input() pictureURL: URL;

  constructor(private modalCtrl: ModalController) { }

  onClose() {
    this.modalCtrl.dismiss();
  }
}
