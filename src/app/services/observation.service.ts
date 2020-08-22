import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NoNullValuesValidator } from '@app/utils/custom-validators';
import { DateService } from './date.service';
import { ObservationValues } from '@app/models/observation-values';
import * as values from '@app/models/observation-values.json';
import { Observation } from '@app/models/observation';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService,
  ) { }

  getObservationEnumValues(): ObservationValues {
    return (values as any).default;
  }

  public buildObservationForm(): FormGroup {
    return this.formBuilder.group({
      fecha: this.dateService.getCurrentDate(),
      direccion: [null, Validators.required],
      coords: [null, Validators.required],
      nombre: [{
        cientifico: null,
        vulgar: null,
      }, NoNullValuesValidator],
      diametro: [null, [
        Validators.required,
        Validators.pattern('^[0-9]*(.[0-9]+)?$')
      ]],
      altura: [null, Validators.required],
      fenologia: [[], [
        Validators.required,
        Validators.minLength(1)
      ]],
      sintomas: [],
      sanidad: [null, Validators.required],
      poda: [null, Validators.required],
      taza: false,
      tutor: false,
      comentario: ''
    });
  }

  public resetObservationForm(form: FormGroup) {
    form.patchValue({
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
    form.markAsUntouched();
  }

  public formToObservation(form: FormGroup): Observation {
    // TODO: Agregar controles de null/undefined
    const { fecha, coords, direccion, comentario, taza, tutor, ...arbol } = (form as any);
    return { fecha, coords, direccion, arbol, comentario, taza, tutor };
  }
}
