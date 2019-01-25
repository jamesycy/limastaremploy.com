import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { HelperListComponent } from './pages/helper-list/helper-list.component';
import { HelperDetailComponent } from './pages/helper-detail/helper-detail.component';

import { LoadSpinnerComponent } from '@shared/components/load-spinner/load-spinner.component';
import { CloseButtonComponent } from '@shared/components/close-button/close-button.component';

import { AgencyHelperRoutingModule } from './routing.module';
import { AgencyHelperService } from '@core/services/agency-helper.service';

@NgModule({
  declarations: [
    CloseButtonComponent,
    HelperListComponent,
    HelperDetailComponent,
    LoadSpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AngularFirestoreModule,
    AgencyHelperRoutingModule
  ],
  providers: [AgencyHelperService]
})
export class AgencyHelperModule { }
