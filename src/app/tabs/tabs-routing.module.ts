import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'region-map',
        loadChildren: () =>
          import('./region-map/region-map.module').then(m => m.RegionMapPageModule)
      },
      {
        path: 'observation',
        loadChildren: () =>
          import('./observation/observation.module').then(m => m.ObservationPageModule)
      },
      {
        path: 'wiki',
        loadChildren: () =>
          import('./wiki/wiki.module').then(m => m.WikiPageModule)
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then(m => m.AccountPageModule)
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/region-map'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
