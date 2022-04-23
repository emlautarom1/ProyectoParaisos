import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { FormPicture } from 'src/app/models/form-picture';
import { PictureService } from 'src/app/services/picture.service';


@Component({
  selector: 'app-observation-tree-pictures',
  templateUrl: './observation-tree-pictures.component.html',
  styleUrls: ['./observation-tree-pictures.component.scss'],
})
export class ObservationTreePicturesComponent implements OnInit, OnDestroy {
  @Input() pictures: FormPicture[];
  selectedPicture: FormPicture | null;

  constructor(
    private pictureService: PictureService,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    history.pushState({ modal: true }, null);
  }

  get selectedPicturePreview() {
    return this.getPicturePreview(this.selectedPicture);
  }

  async onInputChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;

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

  onClearSelectedPicture() {
    this.selectedPicture = null;
  }

  onDeletePicture(picture: FormPicture) {
    const pictures = this.pictures.filter(pic => pic !== picture);
    if (this.selectedPicture === picture) {
      this.onClearSelectedPicture();
    }
    this.pictures = pictures;
  }

  @HostListener('window:popstate')
  onFinishOperation() {
    this.modalCtrl.dismiss(this.pictures);
  }

  ngOnDestroy() {
    if (history.state.modal) {
      history.back();
    }
  }
}
