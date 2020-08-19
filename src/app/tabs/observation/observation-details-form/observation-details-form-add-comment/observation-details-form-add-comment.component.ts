import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-observation-details-form-add-comment',
  templateUrl: './observation-details-form-add-comment.component.html',
  styleUrls: ['./observation-details-form-add-comment.component.scss'],
})
export class ObservationDetailsFormAddCommentComponent implements OnInit, OnDestroy {
  @Input() comment: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    history.pushState({ modal: true }, null);
  }

  saveComment() {
    this.modalCtrl.dismiss(this.comment);
  }

  @HostListener('window:popstate')
  cancelOperation() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    if (history.state.modal) {
      history.back();
    }
  }
}
