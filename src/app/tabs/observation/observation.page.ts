import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.page.html',
  styleUrls: ['./observation.page.scss'],
})
export class ObservationPage implements OnInit {
  @ViewChild('imginput', { static: false }) imageInput: ElementRef;

  currentStep = 1;
  coords: Coordinates;
  picture: string | ArrayBuffer;

  constructor(private geo: GeolocationService) { }

  ngOnInit() {
    this.geo.watchLocation().subscribe((pos: Position) => {
      this.coords = pos.coords;
    });
  }

  getCurrentTitle() {
    switch (this.currentStep) {
      case 1: return "Tu ubicación actual";
      case 2: return "Toma unas Fotos"
      default: return `<ERROR: Paso ${this.currentStep}>`
    }
  }

  onGoBackClick() {
    if (this.currentStep == 2) {
      this.currentStep--;
    }
  }

  onContinueClick() {
    if (this.currentStep == 1) {
      this.currentStep++
    }
  }

  onInputChange(files: FileList) {
    if (files && files.length) {
      // Should be responsability of "PicturesService"
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        console.log(event);

        this.picture = (event.target as any).result;
      };
      reader.readAsDataURL(files[0]);
    }
  }
}
