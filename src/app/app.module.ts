import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';

import { environment } from '../environments/environment';

import { HomeModule } from './modules/home/home.module';
import { AgencyHelperModule } from './modules/agency-helper/agency-helper.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AgencyHelperModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
