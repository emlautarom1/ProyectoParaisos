import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonTextarea, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-observation-comments',
  templateUrl: './observation-comments.component.html',
  styleUrls: ['./observation-comments.component.scss'],
})
export class ObservationCommentsComponent implements OnInit, OnDestroy {
  @ViewChild(IonTextarea) textArea: IonTextarea;
  @Input() comment: string;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    history.pushState({ modal: true }, null);
  }

  onSaveComment() {
    this.modalCtrl.dismiss(this.comment);
  }

  @HostListener('window:popstate')
  onCancel() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    if (history.state.modal) {
      history.back();
    }
  }
}
