import { Injectable } from '@angular/core';
import { Observation } from '@app/models/observation';

@Injectable({
  providedIn: 'root'
})
export class FormParserService {

  constructor() { }

  public formToObservation(form: any): Observation {
    // TODO: Agregar controles de null/undefined
    const { fecha, coords, direccion, comentario, taza, tutor, ...arbol } = form;
    const obs: Observation = { fecha, coords, direccion, arbol, comentario, taza, tutor };
    return obs;
  }
}
