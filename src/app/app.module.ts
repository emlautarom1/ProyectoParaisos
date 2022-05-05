import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountPage } from './components/account/account.page';
import { ObservationCommentsComponent } from './components/observation/observation-comments/observation-comments.component';
import { ObservationCurrentLocationComponent } from './components/observation/observation-current-location/observation-current-location.component';
import { ObservationTreeNameComponent } from './components/observation/observation-tree-name/observation-tree-name.component';
import { ObservationTreePicturesComponent } from './components/observation/observation-tree-pictures/observation-tree-pictures.component';
import { ObservationComponent } from './components/observation/observation.component';
import { PictureModalComponent } from './components/picture-modal/picture-modal.component';
import { RegionMapObservationDetailsComponent } from './components/region-map/region-map-observation-details/region-map-observation-details.component';
import { RegionMapPage } from './components/region-map/region-map.page';
import { TreeDetailsComponent } from './components/wiki/tree-details/tree-details.component';
import { WikiPage } from './components/wiki/wiki.page';


@NgModule({
  declarations: [
    AppComponent,
    // Account
    AccountPage,
    // Observation
    ObservationComponent,
    ObservationCommentsComponent,
    ObservationCurrentLocationComponent,
    ObservationTreeNameComponent,
    ObservationTreePicturesComponent,
    // Region Map
    RegionMapPage,
    RegionMapObservationDetailsComponent,
    // Wiki
    WikiPage,
    TreeDetailsComponent,
    // Modal
    PictureModalComponent,
  ],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
