import { Injectable } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../date.service';
import { NoNullValuesValidator } from '@app/utils/custom-validators';
import { FormPicture } from '@app/models/form-picture';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  public pictures: FormPicture[];
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService,
  ) {
    this.initialize();
  }

  private initialize() {
    this.pictures = [];
    this.form = this.formBuilder.group({
      fecha: this.dateService.getCurrentDate(),
      direccion: [null, Validators.required],
      coords: [null, Validators.required],
      nombre: [{
        cientifico: null,
        vulgar: null,
      }, NoNullValuesValidator],
      diametro: [null, [
        Validators.required,
        Validators.pattern("^[0-9]*(.[0-9]+)?$")
      ]],
      altura: [null, Validators.required,],
      fenologia: [[], [
        Validators.required,
        Validators.minLength(1)
      ]],
      sintomas: [],
      sanidad: [null, Validators.required],
      poda: [null, Validators.required],
      taza: false,
      tutor: false,
      comentario: ""
    });
  }

  public resetData() {
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
  }
}
