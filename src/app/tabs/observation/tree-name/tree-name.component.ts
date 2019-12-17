import { Component, OnInit, Input } from '@angular/core';
import { FormValuesService } from '@app/services/observation/form-values.service';
import { Name as TreeName } from '@app/models/tree';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tree-name',
  templateUrl: './tree-name.component.html',
  styleUrls: ['./tree-name.component.scss'],
})
export class TreeNameComponent implements OnInit {
  @Input() modalCtrl: ModalController;

  names: TreeName[];

  constructor(private values: FormValuesService) { }

  ngOnInit() {
    this.names = this.values.getNombresArbol();
  }

  cancelSelection() {
    this.modalCtrl.dismiss();
  }

  onNameSelected(name: TreeName) {
    this.modalCtrl.dismiss(name);
  }
}
