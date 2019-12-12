import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgmGeocoder, GeocoderRequest } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private position: Observable<Position>;

  constructor(private geocoder: AgmGeocoder) {
    if ('geolocation' in navigator) {
      this.position = Observable.create((observer: any) => {
        const watchId = window.navigator.geolocation.watchPosition(
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
    } else {
      console.error('Geolocation not available in \'navigator\'');
    }
  }

  latLngToAddress(lat: number, lng: number) {
    const request: GeocoderRequest = {
      location: {
        lat,
        lng
      }
    };
    return this.geocoder.geocode(request).pipe(
      map(res => res[0].address_components[0].long_name)
    );
  }

  watchLocation(): Observable<Position> {
    if (this.position) {
      return this.position;
    } else {
      throw new Error('Current location is not defined');
    }
  }
}
