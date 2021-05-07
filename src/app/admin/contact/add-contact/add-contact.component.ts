import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {ContactService} from '../../../service/contact.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;
  addressForm: FormGroup;
  communicationForm: FormGroup;

  constructor(
    private service: ContactService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.contactForm = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      DateOfBirth: [''],
      Gender: [''],
      Title: ['']
    });
    this.addressForm = this.formBuilder.group({
      Type: [''],
      Number: [''],
      Street: [''],
      Unit: [''],
      City: [''],
      State: [''],
      Zipcode: ['']
    });
    this.communicationForm = this.formBuilder.group({
      Type: [''],
      Value: ['']
    });
  }

  sendForm(): void {
    const contactValue = this.contactForm.value;
    const addressValue = this.addressForm.value;
    const communicationValue = this.communicationForm.value;

    contactValue.DateOfBirth = contactValue.DateOfBirth.toString().replaceAll('-', '/');
    const datepipe: DatePipe = new DatePipe('en-US');

    contactValue.DateOfBirth = datepipe.transform(contactValue.DateOfBirth, 'MM/dd/yyyy')

    const request = {
      Identification: '',
      Address: [],
      Communication: [],
    };

    communicationValue.Preferred = 'true';

    const address: any[] = [];
    address.push(addressValue);

    const communication: any[] = [];
    communication.push(communicationValue);

    request.Identification = contactValue;
    request.Address = address;
    request.Communication = communication;
    console.log('REQUEST');
    console.log(JSON.stringify(request));
    this.service.add(request).pipe(
      take(1))
      .subscribe(
        this.onSuccess,
        this.onFail,
      );
  }

  public onSuccess = (data) => {
    this.router.navigate(['/admin/contact']).then(() => {
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
