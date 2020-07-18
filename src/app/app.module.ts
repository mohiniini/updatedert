import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { NgxSpinnerModule } from "ngx-spinner";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { MaterialModule } from './material.module';
import { ProcessorPagesComponent } from './processor-pages/processor-pages.component';
import { VendorPagesComponent } from './vendor-pages/vendor-pages.component';
//import {RatingModule} from 'ng-starrating';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    LoginComponent,
    AdminPagesComponent,
    ProcessorPagesComponent,
    VendorPagesComponent,
    //RatingModule,

  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule // ToastrModule added

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
