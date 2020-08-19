import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FormPicture } from '@app/models/form-picture';
import { PictureService } from '@app/services/picture.service';
import { ObservationService } from '@app/services/observation.service';

@Component({
  selector: 'app-tree-pictures',
  templateUrl: './tree-pictures.component.html',
  styleUrls: ['./tree-pictures.component.scss'],
})
export class TreePicturesComponent {
  selectedPicture: FormPicture | null;

  constructor(
    private obsService: ObservationService,
    private pictureService: PictureService,
    private sanitizer: DomSanitizer,
  ) { }

  get pictures(): FormPicture[] {
    return this.obsService.pictures;
  }

  set pictures(newPictures: FormPicture[]) {
    this.obsService.pictures = newPictures;
  }

  get selectedPicturePreview() {
    return this.getPicturePreview(this.selectedPicture);
  }

  async onInputChange(files: FileList) {
    if (files && files.length) {
      const file = files[0];
      const { photo, url } = await this.pictureService.processFileAsPicture(file);
      const uploadedPictures = this.pictures || [];
      const newPicture: FormPicture = {
        data: photo.data,
        orientation: photo.orientation,
        name: file.name,
        url
      };
      this.pictures = [...uploadedPictures, newPicture];
    }
  }

  getPicturePreview(preview: FormPicture) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(preview.url);
  }

  onSelectedPicture(picture: FormPicture) {
    this.selectedPicture = picture;
  }

  clearSelectedPicture() {
    this.selectedPicture = null;
  }

  deletePicture(picture: FormPicture) {
    const pictures = this.pictures.filter(pic => pic !== picture);
    if (this.selectedPicture === picture) {
      this.clearSelectedPicture();
    }
    this.pictures = pictures;
  }
}
