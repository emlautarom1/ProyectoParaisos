import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ObservationDTO } from 'src/app/models/observation';


@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  public getAllObservations(): Observable<ObservationDTO[]> {
    return this.db
      .collection<ObservationDTO>('observaciones')
      .valueChanges()
      .pipe(first());
  }

  public imageURLtoDownloadURL(url: string): Promise<URL> {
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
