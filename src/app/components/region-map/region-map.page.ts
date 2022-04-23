import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ObservationDTO } from 'src/app/models/observation';
import { ExcelService } from 'src/app/services/excel.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { RegionMapObservationDetailsComponent } from './region-map-observation-details/region-map-observation-details.component';


@Component({
  selector: 'app-region-map',
  templateUrl: './region-map.page.html',
  styleUrls: ['./region-map.page.scss'],
})
export class RegionMapPage implements OnInit {
  registeredObservations$: Observable<ObservationDTO[]>;
  mapOptions: google.maps.MapOptions = {
    zoom: 16,
    center: { lat: -33.292183, lng: -66.339610 },
    disableDefaultUI: true,
    mapTypeId: 'hybrid'
  };

  constructor(
    public mapsService: GoogleMapsService,
    private repository: RepositoryService,
    private excelService: ExcelService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) { }

  async ngOnInit() {
    this.getRegisteredObservations();
  }

  getRegisteredObservations() {
    this.registeredObservations$ = this.repository.getAllObservations();
  }

  async onRefresh() {
    const toast = await this.toastCtrl.create({
      message: 'Actualizando datos...',
      duration: 1000,
    });
    toast.present();
    this.getRegisteredObservations();
  }

  async onExportData() {
    const observations = await this.registeredObservations$.pipe(first()).toPromise();
    await this.excelService.exportObservationsAsExcel(observations);
  }

  async onMarkerClick(observation: ObservationDTO) {
    const modal = await this.modalCtrl.create({
      component: RegionMapObservationDetailsComponent,
      componentProps: { observationDTO: observation }
    });
    await modal.present();
  }
}
