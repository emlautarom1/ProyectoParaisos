import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccountPage } from './components/account/account.page';
import { ObservationComponent } from './components/observation/observation.component';
import { RegionMapPage } from './components/region-map/region-map.page';
import { WikiPage } from './components/wiki/wiki.page';


const routes: Routes = [
  {
    path: 'region-map',
    component: RegionMapPage
  },
  {
    path: 'observation',
    component: ObservationComponent
  },
  {
    path: 'wiki',
    component: WikiPage
  },
  {
    path: 'account',
    component: AccountPage
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'region-map'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
