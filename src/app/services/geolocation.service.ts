import { Injectable } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { catchError, debounce, map, shareReplay } from 'rxjs/operators';
import { GoogleMapsService } from './google-maps.service';
import GeocoderRequest = google.maps.GeocoderRequest;


@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private static UNKNOWN_ADDRESS = 'Dirección desconocida';
  private position$: Observable<GeolocationPosition>;

  constructor(private googleMaps: GoogleMapsService) {
    if ('geolocation' in navigator) {
      this.position$ = new Observable<GeolocationPosition>(observer => {
        const watchId = window.navigator.geolocation.watchPosition(
          function success(pos) { observer.next(pos); },
          function error(err) { observer.error(err); },
          { enableHighAccuracy: true });
        return () => {
          window.navigator.geolocation.clearWatch(watchId);
        };
      }).pipe(
        debounce(() => interval(1000)),
        shareReplay()
      );
    } else {
      console.error('Geolocation not available in \'navigator\'');
    }
  }

  latLngToAddress(lat: number, lng: number): Observable<string> {
    const request: GeocoderRequest = { location: { lat, lng } };
    return this.googleMaps.geocode(request).pipe(
      map(res => res.results[2].formatted_address),
      catchError(_ => of(GeolocationService.UNKNOWN_ADDRESS))
    );
  }

  currentPosition$(): Observable<GeolocationPosition> {
    if (this.position$) {
      return this.position$;
    } else {
      throw new Error('Current location is undefined');
    }
  }
}
