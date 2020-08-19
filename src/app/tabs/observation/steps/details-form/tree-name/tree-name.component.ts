import { Component, OnInit, HostListener } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { Name as TreeName } from '@app/models/tree';
import { FormValuesService } from '@app/services/observation/form-values.service';

@Component({
  selector: 'app-tree-name',
  templateUrl: './tree-name.component.html',
  styleUrls: ['./tree-name.component.scss'],
})
export class TreeNameComponent implements OnInit {
  names: TreeName[];

  constructor(
    private values: FormValuesService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.names = this.values.getNombresArbol();
    history.pushState({ modal: true }, null);
  }

  ngOnDestroy() {
    if (history.state.modal) {
      history.back();
    }
  }

  @HostListener("window:popstate")
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
