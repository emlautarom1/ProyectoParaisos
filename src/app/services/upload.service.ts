import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { UploadTask, UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

import { UUID } from '@app/utils/uuid';
import { Observation, ObservationDTO } from '@app/models/observation';
import { FormPicture } from '@app/models/form-picture';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private obsRef: AngularFirestoreCollection;
  private picRef: AngularFireStorageReference;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.picRef = this.storage.ref('fotos');
    this.obsRef = this.db.collection('observaciones');
  }

  private async storeObservation(dto: ObservationDTO) {
    await this.obsRef.add(dto);
  }

  private async storePicture(picture: FormPicture) {
    const uuid = UUID();
    const extension = picture.name.split('.').pop();
    const fullName = `${uuid}.${extension}`;

    const ref = this.picRef.child(fullName);
    const uploadTask: UploadTask = ref.put(picture.data);
    const snap: UploadTaskSnapshot = await uploadTask;
    return snap.metadata.fullPath;
  }

  async uploadObservation(observation: Observation, pictures: FormPicture[]) {
    const urls = await Promise.all(
      pictures.map(pic => this.storePicture(pic))
    );
    const dto: ObservationDTO = { obs: observation, pictures: urls };
    await this.storeObservation(dto);
  }
}
