import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { DateService } from 'src/app/services/date.service';
import { ObservationFormService } from 'src/app/services/observation-form.service';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.page.html',
  styleUrls: ['./observation.page.scss'],
})
export class ObservationPage implements OnInit {
  @ViewChild('imginput', { static: false }) imageInput: ElementRef;

  currentStep = 3;

  coords: Coordinates;
  picture: String | ArrayBuffer;
  address: String;
  date: String;

  constructor(
    private geoS: GeolocationService,
    private dateS: DateService,
  ) { }

  ngOnInit() {
    this.geoS.watchLocation().subscribe((pos: Position) => {
      this.coords = pos.coords;
      this.geoS.coordsToAddress(pos.coords)
        .subscribe(addr => this.address = addr);
    });
    this.date = this.dateS.getCurrentDate();
  }

  getCurrentTitle() {
    switch (this.currentStep) {
      case 1: return "Tu ubicación actual";
      case 2: return "Toma unas Fotos";
      case 3: return "Agrega unos detalles";
      default: return `<ERROR: Paso ${this.currentStep}>`
    }
  }

  onGoBackClick() {
    if (this.currentStep !== 1) {
      this.currentStep--;
    }
  }

  onContinueClick() {
    if (this.currentStep !== 3) {
      this.currentStep++
    }
  }

  onInputChange(files: FileList) {
    if (files && files.length) {
      // Should be responsability of "PicturesService"
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.picture = (event.target as any).result;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onAddComments() {
    console.log('clicked');
  }

  async onFinishClick() {
    console.log("finish");
  }
}
