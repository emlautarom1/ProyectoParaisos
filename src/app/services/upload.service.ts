import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { FormPicture } from 'src/app/models/form-picture';
import { Observation, ObservationDTO } from 'src/app/models/observation';
import { generateUUID } from 'src/app/utils/uuid';


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
    return await this.obsRef.add(dto);
  }

  private async storePicture(picture: FormPicture): Promise<string> {
    const uuid = generateUUID();
    const extension = picture.name.split('.').pop();
    const fullName = `${uuid}.${extension}`;

    const ref = this.picRef.child(fullName);
    const uploadTask: AngularFireUploadTask = ref.put(picture.data);
    const snap: UploadTaskSnapshot = await uploadTask;
    return snap.metadata.fullPath;
  }

  async uploadObservation(observation: Observation, pictures: FormPicture[]) {
    const urls = await Promise.all(
      pictures.map(pic => this.storePicture(pic))
    );
    const dto: ObservationDTO = { obs: observation, pictures: urls };
    return await this.storeObservation(dto);
  }
}
