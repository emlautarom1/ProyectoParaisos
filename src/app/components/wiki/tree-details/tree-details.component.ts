import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TreeDetails } from 'src/app/models/tree-details';

@Component({
  selector: 'app-tree-details',
  templateUrl: './tree-details.component.html',
  styleUrls: ['./tree-details.component.scss'],
})
export class TreeDetailsComponent implements OnInit {
  @Input() tree: TreeDetails;
  treeProps: [string, string?][];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    history.pushState({ modal: true }, null);

    this.treeProps = [
      ["Nombre Científico", this.tree.nombre_cientifico],
      ["Familia", this.tree.familia],
      ["Sinónimos", this.tree.sinonimos],
      ["Nombre Común", this.tree.nombre_comun],
      ["Lugar de Origen", this.tree.lugar_de_origen],
      ["Etimología", this.tree.etimologia]
    ];
  }

  ngOnDestroy() {
    if (history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate')
  onReturn() {
    this.modalCtrl.dismiss();
  }

}
