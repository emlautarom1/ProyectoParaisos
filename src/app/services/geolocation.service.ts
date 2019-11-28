import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private position: Observable<Position>;

  constructor() {
    if ('geolocation' in navigator)
      this.position = Observable.create((observer: any) => {
        var watchId = window.navigator.geolocation.watchPosition(
          function success(pos) {
            observer.next(pos);
          },
          function error(err) {
            observer.error(err);
          },
          { enableHighAccuracy: true });
        return () => {
          window.navigator.geolocation.clearWatch(watchId);
        };
      });
    else {
      console.error("Geolocation not available in 'navigator'");
    }
  }

  watchLocation() {
    if (this.position) {
      return this.position;
    } else {
      throw new Error("Current location is not defined");
    }
  }
}
