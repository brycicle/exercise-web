import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';
import {Router} from '@angular/router';
import {ContactService} from '../../service/contact.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: any;
  constructor(
    private service: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  public loadContacts(): void {
    this.service.getContacts().pipe(
      take(1))
      .subscribe(
        this.onSuccess,
        this.onFail,
      );
  }

  public onSuccess = (data) => {
    this.contacts = data;
    console.log(data);
  }

  public onFail = ({ error, status }) => {
    console.log('ERROR');
    console.log(error);
    console.log(status);
  }

  public deleteContact(id: string): void {
    this.service.delete(id).pipe(
      take(1))
      .subscribe(
        this.onSuccessDelete,
        this.onFail,
      );
  }

  public onSuccessDelete = (data) => {
    this.loadContacts();
  }

}
