import { RoomModel } from './room.model';

export class Address {
  address: string;
  coordinate: string;
  building: number; //buildingType id

  constructor(data) {
    this.address = data.address || '';
    this.coordinate = data.coordinate||'';
    this.building = data.building || 0;
  }
}

export class QuoteModel {
  customer_id: number;
  moving_date: any;
  travel_charge: boolean;
  dispatch:number;
  more_details:string;
  garage_entrance: boolean;
  setting_up: boolean;
  clustered_furniture: boolean;
  loading_only: boolean;
  unloading_only: boolean;
  labor: number;
  truck: number; //truckId
  from_address: Address;
  to_address: Address;
  rooms: RoomModel[];

  constructor(data) {
    // this.customer_id = data.customerId || 0;
    // this.moving_date = data.movingData || '';
    // this.travel_charge = data.travelCharge || false;
    // this.garage_entrance = false;
    // this.setting_up = false;
    // this.clustered_furniture = false;
    // this.loading_only = false;
    // this.unloading_only = false;
    // this.labor = data.labors || 0;
    // this.truck = data.truckId || 0;
    // this.from_address = new Address(data.);
    // this.to_address = new Address(data.toAddressData);
    // this.rooms = data.rooms || [];
  }
}
export class DeliveryOptions{
  moving_date: any;
  dispatch:number;
  more_details:string;
  labor: number;
  truck: number; //truckId
  complications:string[];
  constructor(data:any={}){
    this.moving_date=data.moving_date||new Date();
    this.complications=data.complications||[];
    this.dispatch=data.dispatch||0;
    this.more_details=data.more_details||'';
    this.labor=data.labor||2;
    this.truck=data.truck||5;

  }
}
