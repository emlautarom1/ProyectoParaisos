import { Injectable } from '@angular/core';
import Compress from 'client-compress';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  private compress = new Compress({
    quality: 0.80

  })

  constructor() { }

  async compressFile(file: File) {
    const conversions = await this.compress.compress([file]);
    const { photo, info } = conversions[0];
    console.log(info);
    const url = URL.createObjectURL(photo.data);
    return { photo, url };
  }
}
