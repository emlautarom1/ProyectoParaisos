import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { NoNullValuesValidator } from '@app/utils/custom-validators';
import { GeolocationService } from '@app/services/geolocation.service';
import { DateService } from '@app/services/date.service';
import { FormValuesService } from '@app/services/observation/form-values.service';

import { TreeNameComponent } from './tree-name/tree-name.component';
import { AddCommentComponent } from './add-comment/add-comment.component';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.page.html',
  styleUrls: ['./observation.page.scss'],
})
export class ObservationPage implements OnInit {
  @ViewChild('imginput', { static: false }) imageInput: ElementRef;

  currentStep = 2;

  alturas: string[];
  fenologias: string[];
  sintomas: string[];
  sanidades: string[];

  observacion: FormGroup;
  fotoSeleccionada: String | null;

  constructor(
    private geoS: GeolocationService,
    private dateS: DateService,
    private formBuilder: FormBuilder,
    private formValues: FormValuesService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.sanidades = this.formValues.getSanidades();
    this.alturas = this.formValues.getAlturas();
    this.fenologias = this.formValues.getFenologias();
    this.sintomas = this.formValues.getSintomas();

    this.observacion = this.buildForm();

    this.geoS.watchLocation().subscribe((pos: Position) => {
      this.observacion.patchValue({ coords: pos.coords });
      this.geoS.coordsToAddress(pos.coords)
        .subscribe(addr => {
          this.observacion.patchValue({ direccion: addr });
        });
    });
  }

  private buildForm() {
    return this.formBuilder.group({
      fecha: this.dateS.getCurrentDate(),
      direccion: [null, Validators.required],
      coords: [null, Validators.required],
      fotos: [],
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
      podaCorrecta: false,
      taza: false,
      tutor: false,
      comentario: ""
    });
  }

  get coords(): Coordinates {
    return this.observacion.get('coords').value;
  }

  get direccion(): String {
    return this.observacion.get('direccion').value;
  }

  get fotos(): String[] {
    return this.observacion.get('fotos').value;
  }

  get nombre() {
    return this.observacion.get('nombre').value;
  }

  get currentTitle() {
    switch (this.currentStep) {
      case 1: return 'Tu ubicación actual';
      case 2: return 'Toma unas Fotos';
      case 3: return 'Agrega unos detalles';
      default: return `<ERROR: Paso ${this.currentStep}>`;
    }
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

  onInputChange(files: FileList) {
    if (files && files.length) {
      // TODO: Mover a un servicio de Fotos
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        const fotosCargadas = this.observacion.get('fotos').value || [];
        const nuevaFoto = (event.target as any).result;
        const fotos = [...fotosCargadas, nuevaFoto];
        this.observacion.patchValue({ fotos });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onSelectedPicture(foto: String) {
    this.fotoSeleccionada = foto;
  }

  clearSelectedPicture() {
    this.fotoSeleccionada = null;
  }

  borrarFoto(foto: String) {
    const fotos = this.fotos.filter(ft => ft !== foto);
    if (this.fotoSeleccionada === foto) {
      this.clearSelectedPicture();
    }
    this.observacion.patchValue({ fotos });
  }

  async showNameModal() {
    const modal = await this.modalCtrl.create({
      component: TreeNameComponent,
      componentProps: {
        modalCtrl: this.modalCtrl
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.observacion.patchValue({ nombre: data });
    }
  }

  async showAddCommentModal() {
    const comentarioActual = this.observacion.get('comentario').value;

    const modal = await this.modalCtrl.create({
      component: AddCommentComponent,
      componentProps: {
        modalCtrl: this.modalCtrl,
        comentario: comentarioActual
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.observacion.patchValue({ comentario: data });
    }
  }

  onFinish() {
    console.log('Form: ', this.observacion.value);
  }
}
