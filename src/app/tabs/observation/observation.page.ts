import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.page.html',
  styleUrls: ['./observation.page.scss'],
})
export class ObservationPage implements OnInit {
  @ViewChild('imginput', { static: false }) imageInput: ElementRef;

  currentStep = 2;

  observacion: FormGroup;
  fotoSeleccionada: String | null;

  constructor(
    private geoS: GeolocationService,
    private dateS: DateService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
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
    // TODO: Agregar validacion
    return this.formBuilder.group({
      fecha: this.dateS.getCurrentDate(),
      direccion: null,
      coords: null,
      fotos: [],
      nombre: {
        cientifico: null,
        vulgar: null,
      },
      diametro: null,
      altura: null,
      fenologia: null,
      sintomas: [],
      sanidad: null,
      podaCorrecta: false,
      taza: false,
      tutor: false,
      observaciones: null
    })
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

  getCurrentTitle() {
    switch (this.currentStep) {
      case 1: return "Tu ubicación actual";
      case 2: return "Toma unas Fotos";
      case 3: return "Agrega unos detalles";
      default: return `<ERROR: Paso ${this.currentStep}>`
    }
  }

  onGoBackClick() {
    if (this.currentStep !== 1) {
      this.currentStep--;
    }
  }

  onContinueClick() {
    if (this.currentStep !== 3) {
      this.currentStep++
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
        this.observacion.patchValue({ fotos: fotos });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  borrarFoto(foto: String) {
    const fotos = this.fotos.filter(ft => ft !== foto);
    this.observacion.patchValue({ fotos: fotos });
  }

  onAddComments() {
    console.log('clicked');
  }

  onFinish() {
    console.log("Form: ", this.observacion.value);
  }
}
