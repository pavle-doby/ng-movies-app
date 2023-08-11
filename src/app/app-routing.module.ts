import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./details-page/details-page.module').then(
        (m) => m.DetailsPageModule
      ),
  },
  {
    path: 'discover',
    loadChildren: () =>
      import('./discover-page/discover-page.module').then(
        (m) => m.DiscoverPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
