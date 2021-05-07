import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.css']
})
export class LayoutNavbarComponent implements OnInit {
  isAuthenticated: any;
  constructor(
    private service: AccountService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('Route : ' + this.router);
    this.isAuthenticated = this.service.getUserToken();
  }

  logout(): void {
    this.service.logout();
  }

}
