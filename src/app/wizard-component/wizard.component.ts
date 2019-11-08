import {FormBuilder} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Customer} from './shared/models/customer.model';
import {CustomerService} from '../shared/services/customer.service';
import {QuoteService} from '../shared/services/quote.service';
import {TruckService} from '../shared/services/truck.service';
import {Address, DeliveryOptions, QuoteModel} from './shared/models/quote.model';
import {calculatedQuoteModel} from './shared/models/calculatedQuote.model';
import {RoomModel} from './shared/models/room.model';
import * as moment from 'moment';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SettingsService} from '../shared/services/settings.service';
import {ActivatedRoute} from '@angular/router';
import {DispatchService} from '../shared/services/dispatch.service';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, AfterViewInit {
  dispatches = [];
  trucks = [];
  complications = [
    'Travel Charge',
    'Garage Entrance',
    'Setting Up',
    'Clustered Furniture',
    'Loading Only',
    'Unloading Only',
  ];
  contentDataURL;
  deliveryOptions: DeliveryOptions = new DeliveryOptions({});
  personalInfo: Customer;
  calculatedQuote: calculatedQuoteModel;
  isSeachingInCustomers = false;
  showSavingCustomerSpinner = false;
  debounceTimeout;
  isSelectedCustomer = false;
  isMoveFromValid = false;
  isDeliveryOptionsValid = false;
  isMoveToValid = false;
  isFurnitureListValid = false;
  SelectedCustomerId = 0;
  findCustomer;
  phonemask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  findedCustomers: Customer[] = [];
  filteredCustomers: Customer[] = this.findedCustomers;
  quote: QuoteModel = new QuoteModel({});
  fromAddressData: Address = new Address({});
  toAddressData: Address = new Address({});
  rooms: RoomModel[] = [
    {
      products: [],
      id: 1,
      loading_floor: 0,
      unloading_floor: 2,
      name: 'kitchen'
    },
    {
      products: [],
      loading_floor: 5,
      unloading_floor: 3,
      id: 2,
      name: 'room'
    }
  ];

  startDate;
  selectedQuoteData: any;
  today;

  @Input('selectedQuote') selectedQuote = 0;
  displayedColumns: string[] = ['item', 'boxing', 'loadingFloor', 'unloadingFloor', 'answers'];

  isCalculatingQuote = false;

  @ViewChild('stepper') public myStepper: MatStepper;
  totalStepsCount: number;

  buildingTypes = [];


  constructor(private route: ActivatedRoute,
              private dispatchService: DispatchService,
              private _formBuilder: FormBuilder,
              private settingsService: SettingsService,
              private _quoteService: QuoteService,
              private _customerService: CustomerService,
              private _snackBar: MatSnackBar,
              private _toastr: ToastrService,
              private _truckSerivce: TruckService) {

    this.today = this.getToday();
    this.startDate = new Date();
    this.getAllDispatches();
    this.getAllTrucks();
  }


  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }

  ngOnInit() {
    this.personalInfo = new Customer({});
    if (this.selectedQuote) {
      this._quoteService.getQuoteById(this.selectedQuote).then(
        (
          result => {
            this.isSelectedCustomer = true;
            this.selectedQuoteData = {...result.result};

            this.personalInfo = new Customer(this.selectedQuoteData.bill.user);
            this.fromAddressData = new Address(this.selectedQuoteData.bill.from_address);
            this.toAddressData = new Address(this.selectedQuoteData.bill.to_address);
            this.rooms = this.selectedQuoteData.bill.rooms.map(room => {
              delete room.TT;
              delete room.TV;
              delete room.TW;
              delete room.roomProduct;
              room.products.map(product => {
                delete product.TT;
                delete product.TV;
                delete product.TW;
                delete product.volume;
                product.name = product.product.name;
                product.photo = product.product.photo;
                delete product.product;
                return product;
              });
              return room;
            });

            let deliveryOptionsTemp = {
              dispatch: this.selectedQuoteData.bill.dispatch,
              labor: this.selectedQuoteData.labor,
              truck: this.selectedQuoteData.truck,
              more_details: this.selectedQuoteData.bill.more_details,
              moving_date: this.selectedQuoteData.moving_date,
              complications: []
            };

            if (this.selectedQuoteData.bill.setting_up) {
              deliveryOptionsTemp.complications.push('Setting Up');
            }
            if (this.selectedQuoteData.bill.travel_charge) {
              deliveryOptionsTemp.complications.push('Travel Charge');
            }
            if (this.selectedQuoteData.bill.garage_entrance) {
              deliveryOptionsTemp.complications.push('Garage Entrance');
            }
            if (this.selectedQuoteData.bill.clustered_furniture) {
              deliveryOptionsTemp.complications.push('Clustered Furniture');
            }
            if (this.selectedQuoteData.bill.loading_only) {
              deliveryOptionsTemp.complications.push('Loading Only');
            }
            if (this.selectedQuoteData.bill.unloading_only) {
              deliveryOptionsTemp.complications.push('Unloading Only');
            }
            this.deliveryOptions = new DeliveryOptions(deliveryOptionsTemp);

            this.quote.customer_id = this.selectedQuoteData.customer_id;
          }
        )
      );
    }
    this.settingsService.getSettings().then(
      (res => {

      })
    );


  }

  getAllTrucks() {
    this._truckSerivce.getTrucksList().then(res => {
      this.trucks = res.result;
    }).catch(err => {
      console.log(err);
    });
  }

  getAllDispatches() {
    this.dispatchService.getAllDispatches().then(result => {
      this.dispatches = result.result;
    });
  }

  updateDeliveryOptions(data, type) {

    if (type === 'moving_date') {
      this.deliveryOptions.moving_date = data.toLocaleDateString();
    }
    if (type === 'complications') {
      this.quote.garage_entrance = data.indexOf('Garage Entrance') > -1 ? true : false;
      this.quote.setting_up = data.indexOf('Setting Up') > -1 ? true : false;
      this.quote.clustered_furniture = data.indexOf('Clustered Furniture') > -1 ? true : false;
      this.quote.loading_only = data.indexOf('Loading Only') > -1 ? true : false;
      this.quote.unloading_only = data.indexOf('Unloading Only') > -1 ? true : false;
      this.quote.travel_charge = data.indexOf('Travel Charge') > -1 ? true : false;
    }
    if (type === 'dispatch' || 'labor' || 'more_details' || 'truck') {
      this.quote[type] = data;
    }
    this.quote.rooms = this.rooms;
    this.quote.moving_date = moment(this.deliveryOptions.moving_date).format('YYYY-MM-DD');
    this.isDeliveryOptionsValid = true;
    this._quoteService.calculateQuote(this.quote).then((res: any) => {

      if (res.status == 200) {
        this.calculatedQuote = new calculatedQuoteModel(res.result.bill, res.result.updated_at);
        this.calculatedQuote.COST = parseFloat(this.calculatedQuote.COST.toFixed(2));
        this.calculatedQuote.CTC = parseFloat(this.calculatedQuote.CTC.toFixed(2));
      }
    });
  }

  goToFromAddress() {

    this.myStepper.next();

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private _findCustomer(value: string) {
    if (value.length >= 3) {
      this.isSeachingInCustomers = true;
      this._customerService.findCustomer(value).then(res => {
        this.findedCustomers = [];
        res.result.map(item => {
          this.findedCustomers.push(new Customer(item));
        });
        this.isSeachingInCustomers = false;
        console.log(res);
      }).catch(err => {
        this.isSeachingInCustomers = false;
        console.log(err);
      });
    }
  }


  filterCustomers() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this._findCustomer(this.findCustomer);
      this.filteredCustomers =
        this.findedCustomers.filter(customer =>
          customer.firstname.toLowerCase().indexOf(this.findCustomer) === 0 ||
          customer.lastname.toLowerCase().indexOf(this.findCustomer) === 0);
    }, 500);
  }

  customerSelected(id) {
    const customer = this.findedCustomers.find(item => item.id === id);
    this.isSelectedCustomer = true;
    this.SelectedCustomerId = id;
    console.log(this.quote);
    this.personalInfo.firstname = customer.firstname;
    this.personalInfo.lastname = customer.lastname;
    this.personalInfo.middlename = customer.middlename;
    this.personalInfo.email = customer.email;
    this.personalInfo.second_email = customer.second_email;
    this.personalInfo.phone = customer.phone;
    this.quote.customer_id = this.SelectedCustomerId;
  }

  registerCustomer() {
    // this.PersonalInfoFormGroup.er
    this.showSavingCustomerSpinner = true;
    this._customerService.registerCustomer(this.personalInfo).then((res: any) => {
      this.SelectedCustomerId = res.result.id;
      this.quote.customer_id = this.SelectedCustomerId;
      console.log(this.quote);
      this.isSelectedCustomer = true;
      this.openSnackBar('Customer saved successfully', '');
      this.showSavingCustomerSpinner = false;
      // this.myStepper.next();
    }).catch(err => {
      console.log(err);
      this.showSavingCustomerSpinner = false;
      this.openSnackBar('Saving Customer Failed.Something went wrong!', '');
    });
  }

  getMoveFromData(data) {
    this.fromAddressData = new Address(data);
    this.quote.from_address = this.fromAddressData;

    if (this.fromAddressData.coordinate === '') {
      this.isMoveFromValid = false;
      return;
    }
    if (this.fromAddressData.building === null || this.fromAddressData.building === 0) {
      this.isMoveFromValid = false;
      return;
    }
    this.isMoveFromValid = true;
  }

  getMoveToData(data) {
    this.toAddressData = new Address(data);
    this.quote.to_address = this.toAddressData;

    if (this.toAddressData.coordinate === '') {
      this.isMoveToValid = false;
      return;
    }
    if (this.toAddressData.building === null || this.toAddressData.building === 0) {
      this.isMoveToValid = false;
      return;
    }
    this.isMoveToValid = true;
  }

  onRoomsDataChanged(data) {
    this.rooms = [];
    this.rooms = [...data];

    const emptyRooms = this.rooms.filter(item => item.products.length < 1);
    if (emptyRooms.length < 1 && this.rooms.length > 0) {
      this.isFurnitureListValid = true;
    }
  }

  calculateSet() {
    this.quote.garage_entrance = this.deliveryOptions.complications.indexOf('Garage Entrance') > -1 ? true : false;
    this.quote.setting_up = this.deliveryOptions.complications.indexOf('Setting Up') > -1 ? true : false;
    this.quote.clustered_furniture = this.deliveryOptions.complications.indexOf('Clustered Furniture') > -1 ? true : false;
    this.quote.loading_only = this.deliveryOptions.complications.indexOf('Loading Only') > -1 ? true : false;
    this.quote.unloading_only = this.deliveryOptions.complications.indexOf('Unloading Only') > -1 ? true : false;
    this.quote.travel_charge = this.deliveryOptions.complications.indexOf('Travel Charge') > -1 ? true : false;
    this.quote.labor = this.deliveryOptions.labor;
    this.quote.rooms = this.rooms;
    this.quote.more_details = this.deliveryOptions.more_details;
    this.quote.dispatch = this.deliveryOptions.dispatch;
    this.quote.moving_date = moment(this.deliveryOptions.moving_date).format('YYYY-MM-DD');
    this.quote.truck = this.deliveryOptions.truck;
    this.isDeliveryOptionsValid = true;
  }

  calculateQuote() {
    this.calculateSet();
    this._quoteService.calculateQuote(this.quote).then((res: any) => {
      this.calculatedQuote = new calculatedQuoteModel(res.result.bill, res.result.updated_at);
      this.myStepper.next();
    }).catch(err => console.log(err));
  }

  createQuote(email) {
    this._quoteService.createQuote(this.quote).then((res: any) => {
      this.myStepper.selectedIndex = 0;
      this.resetWizard();

    }).catch(err => console.log(err));
  }

  updateQuote(email) {
    this._quoteService.updateQuote(this.quote, this.selectedQuote).then((res: any) => {
      this.myStepper.selectedIndex = 0;
      if (email) {
        this.sendQuoteHTML();
      }
      this.resetWizard();

    }).catch(err => console.log(err));
  }

  resetWizard() {
    localStorage.removeItem('userId');
    this.fromAddressData = new Address({});
    this.toAddressData = new Address({});
    this.deliveryOptions = new DeliveryOptions({});
    this.rooms = [
      {
        products: [],
        id: 1,
        loading_floor: 0,
        unloading_floor: 2,
        name: 'kitchen'
      },
      {
        products: [],
        loading_floor: 5,
        unloading_floor: 3,
        id: 2,
        name: 'room'
      }
    ];
  }

  getToday() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    // January is 0!
    const yyyy = today.getFullYear();

    const todayDate = mm + '/' + dd + '/' + yyyy;
    return todayDate;
  }


  validateMoveFromData() {
    if (this.fromAddressData.coordinate === '0,0') {
      this._toastr.warning('Please choose location', 'Validation Error');
      return;
    }
    if (this.fromAddressData.building === null || this.fromAddressData.building === 0) {
      this._toastr.warning('Please select Building Type', 'Validation Error');
      return;
    }
    // this.isMoveFromValid = true;

    this.myStepper.next();
  }

  validateMoveToData() {
    if (this.toAddressData.coordinate === '0,0') {
      this._toastr.warning('Please choose Destination', 'Validation Error');
      return;
    }
    if (this.toAddressData.building === null || this.toAddressData.building === 0) {
      this._toastr.warning('Please select Building Type', 'Validation Error');
      return;
    }
    // this.isMoveToValid = true;
    this.myStepper.next();

  }

  validateFurnitureListData(stepper) {
    const emptyRooms = this.rooms.filter(item => item.products.length < 1);
    if (this.rooms.length === 0) {
      this._toastr.warning('Create at least one room.', 'Validation Error');
    }
    if (emptyRooms.length > 0) {
      this._toastr.warning(emptyRooms[0].name + ' must contain at least one product.', 'Validation Error');
    } else {
      this.isFurnitureListValid = true;
      stepper.next();
      this.calculateSet();
      this.updateDeliveryOptions(null, null);
    }

  }

  clearCustomerForm() {
    this.isSelectedCustomer = false;
    this.personalInfo = new Customer({});
    this.findCustomer = '';
  }

  sendQuoteHTML() {
    const quotePDFZone = document.getElementById('Quoteee');
    const body = {
      email: this.calculatedQuote.email,
      body: quotePDFZone.outerHTML
    };
    this._quoteService.sendQuoteAsHtml(body).then(res => {

    }).catch(err => {

    });
  }

}
