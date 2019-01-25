import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './modules/home/pages/homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'helper',
    loadChildren: '@modules/agency-helper/agency-helper.module#AgencyHelperModule'
  },
  {
    path: 'helpers',
    loadChildren: '@modules/agency-helper/agency-helper.module#AgencyHelperModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
