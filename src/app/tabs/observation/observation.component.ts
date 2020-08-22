import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController, LoadingController, IonContent } from '@ionic/angular';

import { ObservationService } from '@app/services/observation.service';
import { AuthService } from '@app/services/auth.service';
import { UploadService } from '@app/services/upload.service';
import { ObservationValues } from '@app/models/observation-values';

import { ObservationCurrentLocationComponent } from './observation-current-location/observation-current-location.component';
import { ObservationTreeNameComponent } from './observation-tree-name/observation-tree-name.component';
import { ObservationCommentsComponent } from './observation-comments/observation-comments.component';
import { ObservationTreePicturesComponent } from './observation-tree-pictures/observation-tree-pictures.component';
import { FormGroup } from '@angular/forms';
import { FormPicture } from '@app/models/form-picture';
import { GeolocationService } from '@app/services/geolocation.service';


@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss'],
})
export class ObservationComponent implements OnInit {
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  form: FormGroup;
  pictures: FormPicture[];
  enumValues: ObservationValues;

  constructor(
    private obsService: ObservationService,
    private geoService: GeolocationService,
    private authService: AuthService,
    private uploadService: UploadService,

    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  async ngOnInit() {
    this.form = this.obsService.buildObservationForm();
    this.pictures = [];
    this.enumValues = this.obsService.getObservationEnumValues();

    this.geoService.watchLocation().subscribe(position => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log('Coords: ', coords);

      this.form.patchValue({ coords });
      this.geoService.latLngToAddress(coords.lat, coords.lng)
        .subscribe(address => {
          this.form.patchValue({ direccion: address });
        });
    });
  }

  get naturalAddress() {
    return this.form.get('direccion').value;
  }

  get treeName() {
    return this.form.get('nombre').value;
  }

  async onCurrentLocation() {
    const currentCoords = this.form.get('coords').value;

    const modal = await this.modalCtrl.create({
      component: ObservationCurrentLocationComponent,
      componentProps: {
        coords: currentCoords
      }
    });
    await modal.present();
  }

  async onTreeName() {
    const modal = await this.modalCtrl.create({
      component: ObservationTreeNameComponent
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.form.patchValue({ nombre: data });
    }
  }

  async onAddPictures() {
    const modal = await this.modalCtrl.create({
      component: ObservationTreePicturesComponent,
      componentProps: {
        pictures: this.pictures
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.pictures = data;
  }

  async onAddComment() {
    const currentComment = this.form.get('comentario').value;

    const modal = await this.modalCtrl.create({
      component: ObservationCommentsComponent,
      componentProps: {
        comment: currentComment
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.form.patchValue({ comentario: data });
    }
  }

  async onSubmitObservation() {
    if (!this.authService.isAuthenticated) {
      // TODO: Mostrar una alerta si no esta autenticado en vez de esperar hasta este paso
      await this.showToast('Inicia sesión para continuar');
      return;
    }

    if (!this.form.valid) {
      await this.showToast('Complete el formulario para continuar.');
      return;
    }

    const saving = await this.showSaving();
    try {
      const observation = this.obsService.formToObservation(this.form.value);
      await this.uploadService.uploadObservation(observation, this.pictures);
      await this.showToast('Observación guardada exitosamente.');
      this.obsService.resetObservationForm(this.form);
      this.pictures = [];
      this.ionContent.scrollToTop(300);
    } catch (error) {
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
