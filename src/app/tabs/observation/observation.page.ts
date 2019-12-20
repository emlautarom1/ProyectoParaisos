import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { LatLngLiteral } from '@agm/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';

import { NoNullValuesValidator } from '@app/utils/custom-validators';
import { GeolocationService } from '@app/services/geolocation.service';
import { DateService } from '@app/services/date.service';
import { FormValuesService } from '@app/services/observation/form-values.service';
import { FormParserService } from '@app/services/observation/form-parser.service';
import { PictureService } from '@app/services/picture.service';
import { UploadService } from '@app/services/upload.service';
import { AuthService } from '@app/services/auth.service';

import { Name as TreeName } from '@app/models/tree';
import { FormPicture } from '@app/models/form-picture';

import { TreeNameComponent } from './tree-name/tree-name.component';
import { AddCommentComponent } from './add-comment/add-comment.component';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.page.html',
  styleUrls: ['./observation.page.scss'],
})
export class ObservationPage implements OnInit {
  @ViewChild('imginput', { static: false }) imageInput: ElementRef;

  currentStep = 1;

  alturas: string[];
  fenologias: string[];
  sintomas: string[];
  sanidades: string[];
  podas: string[];

  form: FormGroup;
  pictures: FormPicture[];
  selectedPicture: FormPicture | null;

  constructor(
    private geoS: GeolocationService,
    private dateS: DateService,
    private formBuilder: FormBuilder,
    private formValues: FormValuesService,
    private formParser: FormParserService,
    private picS: PictureService,
    private sanitizer: DomSanitizer,
    private uploadS: UploadService,
    private authS: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.sanidades = this.formValues.getSanidades();
    this.alturas = this.formValues.getAlturas();
    this.fenologias = this.formValues.getFenologias();
    this.sintomas = this.formValues.getSintomas();
    this.podas = this.formValues.getPodas();

    this.form = this.buildForm();

    this.geoS.watchLocation().subscribe((pos: Position) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      const latlng = { lat, lng };
      this.form.patchValue({ coords: latlng });
      this.geoS.latLngToAddress(lat, lng)
        .subscribe(addr => {
          this.form.patchValue({ direccion: addr });
        });
    });
  }

  private buildForm() {
    return this.formBuilder.group({
      fecha: this.dateS.getCurrentDate(),
      direccion: [null, Validators.required],
      coords: [null, Validators.required],
      nombre: [{
        cientifico: null,
        vulgar: null,
      }, NoNullValuesValidator],
      diametro: [
        null,
        [
          Validators.required,
          Validators.pattern('^[0-9]*(.[0-9]+)?$')
        ]
      ],
      altura: [
        null,
        Validators.required,
      ],
      fenologia: [
        [],
        [
          Validators.required,
          Validators.minLength(1)
        ]
      ],
      sintomas: [],
      sanidad: [null, Validators.required],
      poda: [null, Validators.required],
      taza: false,
      tutor: false,
      comentario: ''
    });
  }

  get coords(): LatLngLiteral {
    return this.form.get('coords').value;
  }

  get direccion(): string {
    return this.form.get('direccion').value;
  }

  get nombre(): TreeName {
    return this.form.get('nombre').value;
  }

  get currentTitle(): string {
    switch (this.currentStep) {
      case 1: return 'Tu ubicación actual';
      case 2: return 'Toma unas fotos';
      case 3: return 'Agrega unos detalles';
      default: return `<ERROR: Paso ${this.currentStep}>`;
    }
  }

  get selectedPicturePreview() {
    return this.getPicturePreview(this.selectedPicture);
  }

  onGoBackClick() {
    if (this.currentStep !== 1) {
      this.currentStep--;
    }
  }

  onContinueClick() {
    if (this.currentStep !== 3) {
      this.currentStep++;
    }
  }

  async onInputChange(files: FileList) {
    if (files && files.length) {
      const file = files[0];
      const { photo, url } = await this.picS.processFileAsPicture(file);
      const uploadedPictures = this.pictures || [];
      const newPicture: FormPicture = {
        data: photo.data,
        orientation: photo.orientation,
        name: file.name,
        url
      };
      this.pictures = [...uploadedPictures, newPicture];
    }
  }

  getPicturePreview(preview: FormPicture) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(preview.url);
  }

  onSelectedPicture(picture: FormPicture) {
    this.selectedPicture = picture;
  }

  clearSelectedPicture() {
    this.selectedPicture = null;
  }

  deletePicture(picture: FormPicture) {
    const pictures = this.pictures.filter(pic => pic !== picture);
    if (this.selectedPicture === picture) {
      this.clearSelectedPicture();
    }
    this.pictures = pictures;
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
    if (!this.authS.isAuthenticated) {
      await this.showToast('Inicia sesión para continuar');
      return;
    }
    const form = this.form.value;
    const pictures = this.pictures && this.pictures.length > 0
      ? this.pictures
      : [];
    const loading = await this.showLoading();

    try {
      const obs = this.formParser.formToObservation(form);
      await this.uploadS.uploadObservation(obs, pictures);
      await this.showToast('Observación guardada exitosamente.');
      this.resetPage();
    } catch (error) {
      console.error(error);
      await this.showToast('Se ha producido un error.');
    } finally {
      loading.dismiss();
    }
  }

  private async showLoading() {
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

  private resetPage() {
    this.form.patchValue({
      nombre: {
        cientifico: null,
        vulgar: null,
      },
      diametro: null,
      altura: null,
      fenologia: [],
      sintomas: [],
      sanidad: null,
      poda: null,
      taza: false,
      tutor: false,
      comentario: ''
    });
    this.form.markAsUntouched();
    this.pictures = [];
    this.selectedPicture = null;
    this.currentStep = 1;
  }
}
