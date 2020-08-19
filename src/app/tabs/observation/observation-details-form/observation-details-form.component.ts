import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';

import { ObservationValues } from '@app/models/observation-values';
import { Name as TreeName } from '@app/models/tree';

import { ObservationService } from '@app/services/observation.service';
import { AuthService } from '@app/services/auth.service';
import { UploadService } from '@app/services/upload.service';

import { ObservationDetailsFormTreeNameComponent } from './observation-details-form-tree-name/observation-details-form-tree-name.component';
import { ObservationDetailsFormAddCommentComponent } from './observation-details-form-add-comment/observation-details-form-add-comment.component';

@Component({
  selector: 'app-observation-details-form',
  templateUrl: './observation-details-form.component.html',
  styleUrls: ['./observation-details-form.component.scss'],
})
export class ObservationDetailsFormComponent implements OnInit {
  enumValues: ObservationValues;

  constructor(
    private obsService: ObservationService,
    private authService: AuthService,
    private uploadService: UploadService,

    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,

    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.enumValues = this.obsService.enumValues;
  }

  get form() {
    return this.obsService.form;
  }

  get pictures() {
    return this.obsService.pictures;
  }

  get direccion(): string {
    return this.form.get('direccion').value;
  }

  get nombre(): TreeName {
    return this.form.get('nombre').value;
  }

  async showNameModal() {
    const modal = await this.modalCtrl.create({
      component: ObservationDetailsFormTreeNameComponent
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.form.patchValue({ nombre: data });
    }
  }

  async showAddCommentModal() {
    const currentComment = this.form.get('comentario').value;

    const modal = await this.modalCtrl.create({
      component: ObservationDetailsFormAddCommentComponent,
      componentProps: {
        comentario: currentComment
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.form.patchValue({ comentario: data });
    }
  }

  async onFinish() {
    if (!this.form.valid) {
      await this.showToast('Complete el formulario para continuar.');
      return;
    }

    if (!this.authService.isAuthenticated) {
      await this.showToast('Inicia sesión para continuar');
      return;
    }

    const pictures = this.pictures && this.pictures.length > 0
      ? this.pictures
      : [];
    const saving = await this.showSaving();

    try {
      const obs = this.obsService.formToObservation(this.form.value);
      await this.uploadService.uploadObservation(obs, pictures);
      await this.showToast('Observación guardada exitosamente.');

      this.obsService.resetObservation();
      this.router.navigate(['../current-location'], { relativeTo: this.route });
    } catch (error) {
      console.error(error);
      await this.showToast('Se ha producido un error.');
    } finally {
      saving.dismiss();
    }
  }

  private async showSaving() {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando...',
    });
    await loading.present();
    return loading;
  }

  private async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      buttons: [{
        icon: 'close',
        role: 'cancel',
      }],
      duration: 2500
    });
    toast.present();
  }
}
