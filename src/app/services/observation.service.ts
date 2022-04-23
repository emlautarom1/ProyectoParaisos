import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observation } from 'src/app/models/observation';
import { ObservationValues } from 'src/app/models/observation-values';
import { defaultObservationValues } from 'src/app/models/observation-values-default';
import { DateService } from 'src/app/services/date.service';
import { noNullValuesValidator } from 'src/app/utils/custom-validators';


@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService,
  ) { }

  getObservationEnumValues(): ObservationValues {
    return defaultObservationValues;
  }

  public buildObservationForm(): FormGroup {
    return this.formBuilder.group({
      fecha: this.dateService.getCurrentDate(),
      direccion: [null, Validators.required],
      coords: [null, Validators.required],
      nombre: [{
        cientifico: null,
        vulgar: null,
      }, noNullValuesValidator],
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
