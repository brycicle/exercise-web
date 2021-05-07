import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ContactService} from '../../../service/contact.service';
import {take} from 'rxjs/operators';
import {AddressService} from '../../../service/address.service';
import {IdentificationService} from '../../../service/identification.service';
import {CommunicationService} from '../../../service/communication.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {
  public contact;
  closeResult = '';
  public selectedAddressIndex = 0;
  public selectedCommunicationIndex = 0;

  identificationForm: FormGroup;
  addressForm: FormGroup;
  addressFormAdd: FormGroup;
  communicationForm: FormGroup;
  communicationFormAdd: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: ContactService,
    private identificationService: IdentificationService,
    private addressService: AddressService,
    private communicationService: CommunicationService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.contact = this.route.snapshot.data.contact;
  }

  initializeForm(): void {
    this.identificationForm = this.formBuilder.group({
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

    this.addressFormAdd = this.formBuilder.group({
      Type: [''],
      Number: [''],
      Street: [''],
      Unit: [''],
      City: [''],
      State: [''],
      Zipcode: ['']
    });
    this.communicationFormAdd = this.formBuilder.group({
      Type: [''],
      Value: ['']
    });
  }

  public deleteAddress(id: string): void {
    console.log('deleting Address : ' + id);
    this.addressService.delete(id).pipe(
      take(1))
      .subscribe(
        this.onSuccessDelete,
        this.onFail,
      );
  }

  public deleteCommunication(id: string): void {
    console.log('deleting Communication : ' + id);
    this.communicationService.delete(id).pipe(
      take(1))
      .subscribe(
        this.onSuccessDelete,
        this.onFail,
      );
  }

  public onSuccessDelete = () => {
    window.location.reload();
  }

  public updateAddress(index: number, content): void {
    this.selectedAddressIndex = index;
    this.openAddressModal(content, index);
  }

  public updateCommunication(index: number, content): void {
    console.log(this.contact.Communication[index]);
    this.selectedCommunicationIndex = index;
    this.openCommunicationModal(content, index);
  }

  public addAddress(content): void {
    this.openAddAddressModal(content);
  }

  public addCommunication(content): void {
    this.openAddCommunicationModal(content);
  }

  public onFail = ({ error, status }) => {
    console.log('ERROR');
    console.log(error);
    console.log(status);
  }

  openCommunicationModal(content, index: number): void {
    this.modalService.open(content, {ariaLabelledBy: 'communication-update-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const communicationValue = this.communicationForm.value;
      this.communicationService.update(this.contact.Communication[index].Id, communicationValue).pipe(
        take(1))
        .subscribe(
          this.onSuccessDelete,
          this.onFail,
        );
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddAddressModal(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'address-add-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const addressValue = this.addressFormAdd.value;

      const request = {
        Address: []
      };

      const address: any[] = [];
      address.push(addressValue);
      request.Address = address;

      this.addressService.add(this.contact.Identification.Id, request).pipe(
        take(1))
        .subscribe(
          this.onSuccessDelete,
          this.onFail,
        );
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddCommunicationModal(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'communication-add-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const communicationValue = this.communicationFormAdd.value;

      const request = {
        Communication: []
      };

      const communication: any[] = [];
      communication.push(communicationValue);
      request.Communication = communication;

      this.communicationService.add(this.contact.Identification.Id, request).pipe(
        take(1))
        .subscribe(
          this.onSuccessDelete,
          this.onFail,
        );
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddressModal(content, index: number): void {
    this.modalService.open(content, {ariaLabelledBy: 'address-update-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const addressValue = this.addressForm.value;

      this.addressService.update(this.contact.Address[index].Id, addressValue).pipe(
        take(1))
        .subscribe(
          this.onSuccessDelete,
          this.onFail,
        );
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(): void {
    const identificationValue = this.identificationForm.value;

    identificationValue.DateOfBirth = identificationValue.DateOfBirth.toString().replaceAll('-', '/');
    const datepipe: DatePipe = new DatePipe('en-US');

    identificationValue.DateOfBirth = datepipe.transform(identificationValue.DateOfBirth, 'MM/dd/yyyy')

    this.identificationService.update(this.contact.Identification.Id, identificationValue).pipe(
      take(1))
      .subscribe(
        this.onSuccessDelete,
        this.onFail,
      );
  }
}
