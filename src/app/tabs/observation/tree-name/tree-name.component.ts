import { Component, OnInit, Input } from '@angular/core';
import { TreeNamesService } from 'src/app/services/tree-names.service';
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

  constructor(private namesS: TreeNamesService) { }

  ngOnInit() {
    this.nombres = this.namesS.getTreeNames();
  }

  cancelSelection() {
    this.modalCtrl.dismiss();
  }

  onNameSelected(nombre: NombreArbol) {
    this.modalCtrl.dismiss(nombre);
  }
}
