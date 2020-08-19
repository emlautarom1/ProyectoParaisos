import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';

import { FormDataService } from '@app/services/observation/form-data.service';
import { FormParserService } from '@app/services/observation/form-parser.service';
import { FormValuesService } from '@app/services/observation/form-values.service';
import { AuthService } from '@app/services/auth.service';
import { UploadService } from '@app/services/upload.service';

import { Name as TreeName } from '@app/models/tree';

import { TreeNameComponent } from './tree-name/tree-name.component';
import { AddCommentComponent } from './add-comment/add-comment.component';


@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss'],
})
export class DetailsFormComponent implements OnInit {
  alturas: string[];
  fenologias: string[];
  sintomas: string[];
  sanidades: string[];
  podas: string[];

  constructor(
    private dataService: FormDataService,
    private valuesService: FormValuesService,
    private parserService: FormParserService,

    private authService: AuthService,
    private uploadService: UploadService,

    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,

    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sanidades = this.valuesService.getSanidades();
    this.alturas = this.valuesService.getAlturas();
    this.fenologias = this.valuesService.getFenologias();
    this.sintomas = this.valuesService.getSintomas();
    this.podas = this.valuesService.getPodas();
  }

  onNavClick() {
    console.log("CLICKED")
  }

  get form() {
    return this.dataService.form;
  }

  get pictures() {
    return this.dataService.pictures;
  }

  get direccion(): string {
    return this.form.get('direccion').value;
  }

  get nombre(): TreeName {
    return this.form.get('nombre').value;
  }

  async showNameModal() {
    const modal = await this.modalCtrl.create({
      component: TreeNameComponent
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
      component: AddCommentComponent,
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
      const obs = this.parserService.formToObservation(this.form.value);
      await this.uploadService.uploadObservation(obs, pictures);
      await this.showToast('Observación guardada exitosamente.');

      this.dataService.resetData();
      this.router.navigate(["../current-location"], { relativeTo: this.route });
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
