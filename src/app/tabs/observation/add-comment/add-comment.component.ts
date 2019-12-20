import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  @Input() comentario: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  cancelOperation() {
    this.modalCtrl.dismiss();
  }

  saveComment() {
    this.modalCtrl.dismiss(this.comentario);
  }
}
