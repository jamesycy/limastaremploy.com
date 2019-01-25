import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelperListComponent } from './pages/helper-list/helper-list.component';
import { HelperDetailComponent } from './pages/helper-detail/helper-detail.component';

const routes: Routes = [
    {
        path: 'helper',
        pathMatch: 'full',
        component: HelperListComponent
    },
    {
        path: 'helper/:id',
        pathMatch: 'full',
        component: HelperDetailComponent
    },
    {
        path: 'helpers',
        pathMatch: 'full',
        component: HelperListComponent
    },
    {
        path: 'helpers/:id',
        pathMatch: 'full',
        component: HelperDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyHelperRoutingModule { }
