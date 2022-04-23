import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mapTo, mergeMap, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import GeocoderRequest = google.maps.GeocoderRequest;


@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  apiStatus$: Observable<boolean>;

  constructor(httpClient: HttpClient, private geocoder: MapGeocoder) {
    const apiKey = environment.maps.apiKey;
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    this.apiStatus$ = httpClient.jsonp(url, 'callback')
      .pipe(
        tap(_ => console.log('Loading Google Maps API...')),
        mapTo(true),
        catchError((err) => {
          console.log(err);
          return of(false);
        }),
        shareReplay()
      );
  }

  /**
   * See developers.google.com/maps/documentation/javascript/reference/geocoder#Geocoder.geocode
   */
  geocode(request: GeocoderRequest) {
    return this.apiStatus$.pipe(
      mergeMap(isActive => isActive ? this.geocoder.geocode(request) : EMPTY),
    );
  }
}
