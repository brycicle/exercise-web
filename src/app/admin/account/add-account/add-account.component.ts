import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from '../../../service/account.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  addForm: FormGroup;

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
    this.addForm = this.formBuilder.group({
      Username: [''],
      Password: ['']
    });
  }

  sendForm(): void {
    const loginValue = this.addForm.value;
    this.service.register(loginValue).pipe(
      take(1))
      .subscribe(
        this.onSuccess,
        this.onFail,
      );
  }

  public onSuccess = (data) => {
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
