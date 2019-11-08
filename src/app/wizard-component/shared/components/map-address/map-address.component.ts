import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetLocationService} from '../../../../shared/services/get-location.service';
import {EventEmitterService} from '../../../../shared/services/event-emitter.service';
import {BuildingTypeService} from '../../../../shared/services/building-type.service';
import {BuildingType} from '../../models/buildingTypes.model';
import {Address} from '../../models/quote.model';

declare const google: any;

interface OutputData {
  lat: number;
  lng: number;
  buildingTypeId: number;
  address: string;
}

@Component({
  selector: 'app-map-address',
  templateUrl: './map-address.component.html',
  styleUrls: ['./map-address.component.scss']
})
export class MapAddressComponent implements OnInit {
  lat = 0;
  lng = 0;
  _lattitude = 0;
  _longtitude = 0;
  userSettings = {
    inputString: '',
    inputPlaceholderText: 'Type An Address ...'
  };
  marker = {
    label: '',
    lat: 0,
    lng: 0,
    draggable: true
  };

  isFindingAddress = false;

  public OutputData: Address = {
    coordinate: '',
    address: '',
    building: 0
  };

  buildingTypes: BuildingType[] = [
    new BuildingType({
      id: 1,
      name: 'Walk Up Building',
    }),
    new BuildingType({
      id: 1,
      name: 'Apartment',
    }),
    new BuildingType({
      id: 1,
      name: 'Office',
    }),
  ];

  zipCode = '';
  street = '';

  @Input('Label') label;
  @Input('Icon') icon;
  @Input('addressData') addressData = new Address({});
  @Output('onDataChanged') getData = new EventEmitter<Address>();
  zoom = 10;

  constructor(private getLocationService: GetLocationService, private eventEmitterService: EventEmitterService,
              private _buildingService: BuildingTypeService) {

    this._buildingService.getAllBuildingTypes().then((res: any) => {
      this.buildingTypes = [];
      res.result.map(item => this.buildingTypes.push(new BuildingType(item)));
    }).catch(err => console.log(err));

  }

  ngOnInit(): void {
    this.marker.lat = this._lattitude;
    this.marker.lng = this._longtitude;
    if (this.addressData.coordinate !== '') {
      this.marker.lat = parseFloat(this.addressData.coordinate.substr(0, this.addressData.coordinate.indexOf(',')));
      this.marker.lng = parseFloat(this.addressData.coordinate.substr(this.addressData.coordinate.indexOf(',') + 1, this.addressData.coordinate.length));
      this.lat = this.marker.lat;
      this.lng = this.marker.lng;
      this.userSettings.inputString = this.addressData.address;

      this.getAddressFromLatLng(this.marker.lat, this.marker.lng);
      this.OutputData.building = this.addressData.building;
      this.getData.emit(this.OutputData);
    } else {
      this.getLocationService.getPosition().then(position => {
        // @ts-ignore
        const coords = position.coords;
        this.lng = coords.longitude;
        this.lat = coords.latitude;
        this.marker.lat = this.lat;
        this.marker.lng = this.lng;
      });
    }
  }

  // initial center position for the map

  onBuildingTypeSelected() {
    this.OutputData.building = this.addressData.building;
    this.getData.emit(this.OutputData);
  }


  mapClicked(event: any) {
    this.marker = {
      label: this.label,
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: true
    };
    this.getAddressFromLatLng(this.marker.lat, this.marker.lng);
  }

  getAddressFromLatLng(lat, lng) {
    // this.eventEmitterService.loader.emit(true);
    const that = this;
    that.isFindingAddress = true;
    navigator.geolocation.getCurrentPosition(
      function (position) {
        if (navigator.geolocation) {
          const geocoder = new google.maps.Geocoder();
          const latlng = new google.maps.LatLng(lat, lng);
          const request = {
            latLng: latlng
          };
          that.OutputData.coordinate = lat + ',' + lng;
          geocoder.geocode(request, (results, status) => {
              if (status === google.maps.GeocoderStatus.OK) {
                // console.log(results);
                that.userSettings['inputString'] = results[0].formatted_address;
                const postal = results[0].address_components.filter(item => item.types && item.types[0] === 'postal_code');
                if (postal.length > 0) {
                  // console.log(postal);
                  that.zipCode = postal[0].long_name;
                }
                that.OutputData.address = results[0].formatted_address;
                that.userSettings = Object.assign({}, that.userSettings);
                // that.eventEmitterService.loader.emit(false);
                that.isFindingAddress = false;
                document.getElementById('type').focus();
                that.getData.emit(that.OutputData);
              } else {
                that.getData.emit(that.OutputData);
                // that.eventEmitterService.loader.emit(false);
                that.isFindingAddress = false;
              }
            }
          );
        } else {
          that.getData.emit(that.OutputData);
          that.isFindingAddress = false;
          // that.eventEmitterService.loader.emit(false);
        }
      });
  }

  autoCompleteCallback1(selectedData: any) {
    // console.log(selectedData)
    if (selectedData.data) {

      this.lat = selectedData.data.geometry.location.lat;
      this.lng = selectedData.data.geometry.location.lng;
      this.OutputData.coordinate = selectedData.data.geometry.location.lat + ',' + selectedData.data.geometry.location.lng;

      // this.getData.emit(this.OutputData);
      this.marker = {
        label: this.label,
        lat: selectedData.data.geometry.location.lat,
        lng: selectedData.data.geometry.location.lng,
        draggable: true
      };
      this.getAddressFromLatLng(this.lat, this.lng);
    }
  }


  markerDragEnd(event: any) {
    this.marker = {
      label: this.label,
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: true
    };
  }

}
