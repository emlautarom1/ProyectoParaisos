import { Component, OnInit, Input } from '@angular/core';
import { FormValuesService } from '@app/services/observation/form-values.service';
import { NombreArbol } from '@app/models/nombre-arbol';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tree-name',
  templateUrl: './tree-name.component.html',
  styleUrls: ['./tree-name.component.scss'],
})
export class TreeNameComponent implements OnInit {
  @Input() modalCtrl: ModalController;

  nombres: NombreArbol[];

  constructor(private values: FormValuesService) { }

  ngOnInit() {
    this.nombres = this.values.getNombresArbol();
  }

  cancelSelection() {
    this.modalCtrl.dismiss();
  }

  onNameSelected(nombre: NombreArbol) {
    this.modalCtrl.dismiss(nombre);
  }
}
