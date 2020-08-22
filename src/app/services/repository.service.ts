import { Injectable } from '@angular/core';
import { ObservationDTO } from '@app/models/observation';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private observations: ObservationDTO[] = [
    {
      pictures: [],
      obs: {
        arbol: {
          "poda": "Interferencia con Cableado",
          "diametro": 93,
          "sintomas": [],
          "altura": "4 - 10m.",
          "nombre": { "vulgar": "Roble Sedoso", "cientifico": "Grevillea robusta" },
          "fenologia": ["Follaje Completo"], "sanidad": "Muy Bueno"
        },
        "direccion": "Pringles 503, D5700 San Luis, Argentina",
        "taza": true,
        "coords": { "lat": -33.3021809, "lng": -66.3306556 },
        "comentario": "",
        "tutor": false,
        "fecha": "2019-12-19"
      }
    }
  ];

  constructor(
    private db: AngularFirestore,
  ) { }

  public getAllObservations(): Observable<ObservationDTO[]> {
    return of(this.observations).pipe(first());
    /* return <any>this.db
      .collection<ObservationDTO>('observaciones')
      .valueChanges()
      .pipe(first());
    */
  }
}
