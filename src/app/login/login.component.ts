import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from '../service/account.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private service: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      Username: [''],
      Password: ['']
    });
  }


  sendLoginForm(): void {
    const loginValue = this.loginForm.value;
    this.service.login(loginValue).pipe(
      take(1))
      .subscribe(
        this.onSuccess,
        this.onFail,
      );
  }

  public onSuccess = (data) => {
    this.service.setUserToken(data);
    console.log(data);
    this.router.navigate(['/admin/account']).then(() => {
      window.location.reload();
    });
  }

  public onFail = ({ error, status }) => {
    this.toastr.error(error.Error);
    console.log('ERROR');
    console.log(error);
    console.log(status);
  }

}
