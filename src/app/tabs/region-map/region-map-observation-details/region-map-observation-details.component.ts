import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { ObservationDTO, Observation } from '@app/models/observation';
import { ModalController } from '@ionic/angular';
import { RepositoryService } from '@app/services/repository.service';
import { PictureModalComponent } from '@app/shared-components/picture-modal/picture-modal.component';

@Component({
  selector: 'app-region-map-observation-details',
  templateUrl: './region-map-observation-details.component.html',
  styleUrls: ['./region-map-observation-details.component.scss'],
})
export class RegionMapObservationDetailsComponent implements OnInit, OnDestroy {
  @Input() observationDTO: ObservationDTO;
  observation: Observation;
  pictures: URL[];

  constructor(
    private repositoryService: RepositoryService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    history.pushState({ modal: true }, null);

    console.log('Got observation: ', this.observationDTO);
    this.observation = this.observationDTO.obs;
    this.pictures = await Promise.all(
      this.observationDTO.pictures.map(url =>
        this.repositoryService.ImageURLtoDownloadURL(url)
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
