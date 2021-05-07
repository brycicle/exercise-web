import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../service/account.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  public account;
  updateForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: AccountService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account;
    this.initializeForm();
  }

  initializeForm(): void {
    this.updateForm = this.formBuilder.group({
      Username: [''],
      Password: ['']
    });
  }

  sendForm(): void {
    const updateValue = this.updateForm.value;
    console.log('Updating Account : ' + this.account.Id);
    this.service.update(this.account.Id, updateValue).pipe(
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
    console.log('ERROR');
    console.log(error);
    console.log(status);
  }

}
