import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { Name as TreeName } from '@app/models/tree';
import { ObservationService } from '@app/services/observation.service';

@Component({
  selector: 'app-observation-details-form-tree-name',
  templateUrl: './observation-details-form-tree-name.component.html',
  styleUrls: ['./observation-details-form-tree-name.component.scss'],
})
export class ObservationDetailsFormTreeNameComponent implements OnInit, OnDestroy {
  names: TreeName[];

  constructor(
    private obsService: ObservationService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    history.pushState({ modal: true }, null);
    this.names = this.obsService.enumValues.nombres;
  }

  ngOnDestroy() {
    if (history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate')
  cancelSelection() {
    this.modalCtrl.dismiss();
  }

  async onCustomTree() {
    const alert = await this.alertCtrl.create({
      header: 'No Listado',
      subHeader: 'Complete los campos',
      backdropDismiss: true,
      inputs: [
        {
          name: 'cientifico',
          type: 'text',
          placeholder: 'Nombre científico'
        },
        {
          name: 'vulgar',
          type: 'text',
          placeholder: 'Nombre vulgar',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.modalCtrl.dismiss(data);
          }
        }
      ]
    });
    await alert.present();
  }

  onNameSelected(name: TreeName) {
    this.modalCtrl.dismiss(name);
  }
}
