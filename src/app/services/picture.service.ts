import { Injectable } from '@angular/core';
import Compress from 'client-compress';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  private compress = new Compress({
    quality: 0.80
  });

  constructor() { }

  async processFileAsPicture(file: File) {
    // TODO: Add rotation?
    const conversions = await this.compress.compress([file]);
    const { photo } = conversions[0];
    const url = URL.createObjectURL(photo.data);
    return { photo, url };
  }
}
