import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit, OnDestroy {
  @Input() comment: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    history.pushState({ modal: true }, null);
  }

  saveComment() {
    this.modalCtrl.dismiss(this.comment);
  }

  @HostListener("window:popstate")
  cancelOperation() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    if (history.state.modal) {
      history.back();
    }
  }
}
