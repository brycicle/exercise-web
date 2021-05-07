import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  isAuthenticated: any;
  accounts: any;
  constructor(
    private service: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.service.getUserToken();
    this.loadAccounts();
  }

  public loadAccounts(): void {
    this.service.getAccounts().pipe(
      take(1))
      .subscribe(
        this.onSuccess,
        this.onFail,
      );
  }

  public onSuccess = (data) => {
    this.accounts = data;
    console.log(data);
  }

  public onFail = ({ error, status }) => {
    console.log('ERROR');
    console.log(error);
    console.log(status);
  }

  public deleteAccount(id: string): void {
    console.log('deleting account : ' + id);
    this.service.delete(id).pipe(
      take(1))
      .subscribe(
        this.onSuccessDelete,
        this.onFail,
      );
  }

  public onSuccessDelete = (data) => {
    this.loadAccounts();
  }

}
