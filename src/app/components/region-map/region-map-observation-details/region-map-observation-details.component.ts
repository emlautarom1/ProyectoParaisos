import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PictureModalComponent } from 'src/app/components/picture-modal/picture-modal.component';
import { Observation, ObservationDTO } from 'src/app/models/observation';
import { RepositoryService } from 'src/app/services/repository.service';


@Component({
  selector: 'app-region-map-observation-details',
  templateUrl: './region-map-observation-details.component.html',
  styleUrls: ['./region-map-observation-details.component.scss'],
})
export class RegionMapObservationDetailsComponent implements OnInit, OnDestroy {
  @Input() observationDTO: ObservationDTO;
  observation: Observation;
  pictures: URL[];

  slideSettings = {
    slidesPerView: 'auto'
    , zoom: false
    , grabCursor: true
    , spaceBetween: 10
  };

  constructor(
    private repositoryService: RepositoryService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    history.pushState({ modal: true }, null);
    this.observation = this.observationDTO.obs;
    this.pictures = await Promise.all(
      this.observationDTO.pictures.map(url =>
        this.repositoryService.imageURLtoDownloadURL(url)
      )
    );
  }

  ngOnDestroy() {
    if (history.state.modal) {
      history.back();
    }
  }

  async onPictureClick(picture: URL) {
    const modal = await this.modalCtrl.create({
      component: PictureModalComponent,
      componentProps: {
        pictureURL: picture,
      },
      cssClass: 'transparent-modal',
      animated: false,
    });
    await modal.present();
  }

  @HostListener('window:popstate')
  onReturn() {
    this.modalCtrl.dismiss();
  }
}
