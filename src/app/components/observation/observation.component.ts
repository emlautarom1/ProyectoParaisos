import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonContent, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FormPicture } from 'src/app/models/form-picture';
import { ObservationValues } from 'src/app/models/observation-values';
import { AuthService } from 'src/app/services/auth.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ObservationService } from 'src/app/services/observation.service';
import { UploadService } from 'src/app/services/upload.service';
import { ObservationCommentsComponent } from './observation-comments/observation-comments.component';
import { ObservationCurrentLocationComponent } from './observation-current-location/observation-current-location.component';
import { ObservationTreeNameComponent } from './observation-tree-name/observation-tree-name.component';
import { ObservationTreePicturesComponent } from './observation-tree-pictures/observation-tree-pictures.component';


@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss'],
})
export class ObservationComponent implements OnInit, OnDestroy {
  @ViewChild(IonContent) ionContent: IonContent;

  form: FormGroup;
  pictures: FormPicture[];
  enumValues: ObservationValues;

  currentPosition$!: Observable<google.maps.LatLngLiteral>;
  currentAddress$!: Observable<string>;
  private subscriptions: Subscription[];

  constructor(
    private obsService: ObservationService,
    private geoService: GeolocationService,
    private authService: AuthService,
    private uploadService: UploadService,

    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.form = this.obsService.buildObservationForm();
    this.pictures = [];
    this.enumValues = this.obsService.getObservationEnumValues();

    this.currentPosition$ = this.geoService.currentPosition$().pipe(
      map(position => ({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
      ),
    );
    this.currentAddress$ = this.currentPosition$.pipe(
      switchMap(({ lat, lng }) => this.geoService.latLngToAddress(lat, lng))
    );

    const positionSub = this.currentPosition$.subscribe(coords => this.form.patchValue({ coords }));
    const addressSub = this.currentAddress$.subscribe(address => this.form.patchValue({ direccion: address }));

    this.subscriptions = [positionSub, addressSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get date() {
    return this.form.get('fecha').value;
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
    const isAuthenticated = await this.authService.isAuthenticated();
    if (!isAuthenticated) {
      // TODO: Mostrar una alerta si no está autenticado en vez de esperar hasta este paso
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
