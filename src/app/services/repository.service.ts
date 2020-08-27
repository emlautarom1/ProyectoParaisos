import { Injectable } from '@angular/core';
import { ObservationDTO } from '@app/models/observation';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private observations: ObservationDTO[] = [
    {
      pictures: [
        "fotos/7a527217-84fb-4a0a-9314-bbc71b923fa2.jpg",
      ],
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
    private storage: AngularFireStorage,
  ) { }

  public getAllObservations(): Observable<ObservationDTO[]> {
    return of(this.observations).pipe(first());
    /* return <any>this.db
      .collection<ObservationDTO>('observaciones')
      .valueChanges()
      .pipe(first());
    */
  }

  public ImageURLtoDownloadURL(url: string): Promise<URL> {
    return this.storage
      .ref(url)
      .getDownloadURL()
      .pipe(
        map(raw => new URL(raw)),
        first()
      )
      .toPromise();
  }
}
