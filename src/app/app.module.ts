import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutNavbarComponent } from './layout-navbar/layout-navbar.component';
import { AccountsComponent } from './admin/accounts/accounts.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './service/app-routing.module';
import { LoginComponent } from './login/login.component';
import {Requestinterceptor} from './interceptor/requestinterceptor';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { AddAccountComponent } from './admin/account/add-account/add-account.component';
import { UpdateAccountComponent } from './admin/account/update-account/update-account.component';
import {AccountResolver} from './admin/account/account.resolver';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ContactComponent } from './admin/contact/contact.component';
import { AddContactComponent } from './admin/contact/add-contact/add-contact.component';
import { UpdateContactComponent } from './admin/contact/update-contact/update-contact.component';
import { ViewContactComponent } from './admin/contact/view-contact/view-contact.component';
import {ContactResolver} from './admin/contact/contact.resolver';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LayoutNavbarComponent,
    AccountsComponent,
    LoginComponent,
    AddAccountComponent,
    UpdateAccountComponent,
    ContactComponent,
    AddContactComponent,
    UpdateContactComponent,
    ViewContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [
    AccountResolver,
    ContactResolver,
    { provide: HTTP_INTERCEPTORS, useClass: Requestinterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
