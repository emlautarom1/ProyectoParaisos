import { Component, OnInit, Input } from '@angular/core';
import { ValuesProviderService } from "src/app/services/observation/values-provider.service"
import { NombreArbol } from 'src/app/models/observacion-arbol';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tree-name',
  templateUrl: './tree-name.component.html',
  styleUrls: ['./tree-name.component.scss'],
})
export class TreeNameComponent implements OnInit {
  @Input() modalCtrl: ModalController;

  nombres: NombreArbol[];

  constructor(private values: ValuesProviderService) { }

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
