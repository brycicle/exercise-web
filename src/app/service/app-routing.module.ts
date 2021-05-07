import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from '../admin/accounts/accounts.component';
import { LoginComponent} from '../login/login.component';
import { AddAccountComponent } from '../admin/account/add-account/add-account.component';
import { AccountResolver } from '../admin/account/account.resolver';
import {UpdateAccountComponent} from '../admin/account/update-account/update-account.component';
import {ContactComponent} from '../admin/contact/contact.component';
import {AddContactComponent} from '../admin/contact/add-contact/add-contact.component';
import {UpdateContactComponent} from '../admin/contact/update-contact/update-contact.component';
import {ViewContactComponent} from '../admin/contact/view-contact/view-contact.component';
import {ContactResolver} from '../admin/contact/contact.resolver';


const routes: Routes = [
  { path: 'admin/account', component: AccountsComponent },
  { path: 'admin/account/add', component: AddAccountComponent },
  {
    path: 'admin/account/update/:id', component: UpdateAccountComponent,
    resolve: {
      account: AccountResolver
    }
  },
  { path: 'admin/contact', component: ContactComponent },
  { path: 'admin/contact/add', component: AddContactComponent },
  {
    path: 'admin/contact/update/:id', component: UpdateContactComponent,
    resolve: {
      contact: ContactResolver
    }
  },
  {
    path: 'admin/contact/view/:id', component: ViewContactComponent,
    resolve: {
      contact: ContactResolver
    }
  },
  { path: '', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
