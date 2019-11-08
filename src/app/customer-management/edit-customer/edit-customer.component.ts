import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {CustomerService} from '../../shared/services/customer.service';

@Component({
  selector: 'app-furniture',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  customerModel = {
    user_id: 0,
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    second_email: '',
    phone: '',
    address: '',
    status: true
  };
  phonemask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private _customerService: CustomerService, private router: Router, public dialogRef: MatDialogRef<EditCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.customerModel = {...this.data.customer};
    this.customerModel.user_id = this.data.customer.id;
  }

  ngOnInit(): void {
  }

  cancel() {
    this.customerModel = {
      user_id: 0,
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      second_email: '',
      phone: '',
      address: '',
      status: true
    };
    this.dialogRef.close(null);
  }

  editCustomer() {
    this._customerService.editCustomer(this.customerModel).then(res => {
      this.dialogRef.close(res);
    });
  }
}
