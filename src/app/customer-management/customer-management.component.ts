import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Customer} from '../wizard-component/shared/models/customer.model';
import {FormControl, FormGroup} from '@angular/forms';
import {CustomerService} from '../shared/services/customer.service';
import {QuoteModel} from '../wizard-component/shared/models/quote.model';
import {RoomModel} from '../wizard-component/shared/models/room.model';
import {Router} from '@angular/router';
import {EditCustomerComponent} from './edit-customer/edit-customer.component';

@Component({
  selector: 'app-furniture',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {
  PersonalInfoFormGroup: FormGroup;
  isSeachingInCustomers = false;
  debounceTimeout;
  limit = 50;
  isSelectedCustomer = false;
  SelectedCustomerId = 0;
  findCustomerCtrl = new FormControl('');
  findedCustomers: Customer[] = [];
  filteredCustomers: Customer[] = this.findedCustomers;
  quote: QuoteModel = new QuoteModel({});
  rooms: RoomModel[] = [];
  showingCustomerList = [];

  constructor(private _customerService: CustomerService, private router: Router,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getDefaultCustomers();
  }

  public _findCustomer() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {

      if (this.findCustomerCtrl.value.length) {
        this.isSeachingInCustomers = true;
        this._customerService.findCustomer(this.findCustomerCtrl.value).then(res => {
          this.findedCustomers = [];
          this.showingCustomerList = res.result;
          res.result.map(item => {
            this.findedCustomers.push(new Customer(item));
          });
          this.isSeachingInCustomers = false;
        }).catch(err => {
          this.isSeachingInCustomers = false;
        });
      }

    }, 300);
  }


  getDefaultCustomers() {
    this._customerService.findCustomer('', this.limit).then(res => {

      this.showingCustomerList = res.result;

    }).catch(err => {

    });
  }

  showQuotePage(id) {
    localStorage.setItem('userId',id);
    this.router.navigate(['show-customer-quote']);
  }

  openEditCustomerDialog(selectedCustomer, i): void {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      width: '50%',
      height: '82%',
      data: {
        customer: selectedCustomer,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showingCustomerList[i] = {...result.result};
      }
    });
  }
}
