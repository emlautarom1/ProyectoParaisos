import { Injectable } from '@angular/core';
import { NombreArbol } from 'src/app/models/observacion-arbol';

@Injectable({
  providedIn: 'root'
})
export class TreeNamesService {

  constructor() { }

  getTreeNames(): NombreArbol[] {
    return [
      {
        cientifico: "Acer spp",
        vulgar: "Arce"
      },
      {
        cientifico: "Albizia julibrissin",
        vulgar: "Acacia de Constantinopla"
      }
    ]
  }
}
