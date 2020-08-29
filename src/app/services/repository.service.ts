import { Injectable } from '@angular/core';
import { ObservationDTO } from '@app/models/observation';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

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
