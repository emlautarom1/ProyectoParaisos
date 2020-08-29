import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { ObservationDTO, Observation } from '@app/models/observation';
import { ModalController, AnimationController } from '@ionic/angular';
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
  pictures: URL[]; // ? Usar URL o otro formato

  constructor(
    private repositoryService: RepositoryService,
    private animationCtrl: AnimationController,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    history.pushState({ modal: true }, null);

    console.log("Got observation: ", this.observationDTO);
    this.observation = this.observationDTO.obs;
    // this.pictures = await Promise.all(
    //   this.observationDTO.pictures.map(url =>
    //     this.repositoryService.ImageURLtoDownloadURL(url)
    //   )
    // );
    this.pictures = this.dummyPictures();
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
      cssClass: "transparent-modal",
      animated: false,
    });
    await modal.present();
  }

  @HostListener('window:popstate')
  onReturn() {
    this.modalCtrl.dismiss();
  }

  private dummyPictures(): URL[] {
    return Array(5).fill(new URL("https://firebasestorage.googleapis.com/v0/b/proyecto-paraisos.appspot.com/o/fotos%2F7a527217-84fb-4a0a-9314-bbc71b923fa2.jpg?alt=media&token=90ae9c18-0a29-4ce5-8497-13b66fa5c0f2"));
  }
}
