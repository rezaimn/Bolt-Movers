import {Component, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {DispatchService} from '../../shared/services/dispatch.service';
import {GetLocationService} from '../../shared/services/get-location.service';
import {EventEmitterService} from '../../shared/services/event-emitter.service';
import {BuildingTypeService} from '../../shared/services/building-type.service';

declare const google: any;

interface OutputData {
  lat: number;
  lng: number;
  buildingTypeId: number;
  address: string;
}

@Component({
  selector: 'app-add-update-dispatch',
  templateUrl: './add-update-dispatch.component.html',
  styleUrls: ['./add-update-dispatch.component.scss']
})
export class AddUpdateDispatchComponent implements OnInit {
  zoom = 10;
  lat = 0;
  lng = 0;
  userSettings = {
    inputString: '',
    inputPlaceholderText: 'Type An Address ...'
  };
  selectedBuildingTypeIndex = -1;
  marker = {
    label: '',
    lat: 0,
    lng: 0,
    draggable: true
  };

  isFindingAddress = false;

  public OutputData: OutputData = {
    lat: 0,
    lng: 0,
    address: '',
    buildingTypeId: 0
  };

  name = '';
  editMode = false;
  dispatch = {
    id: '',
    address: '',
    coordinate: ''
  };

  constructor(private dispatchService: DispatchService, private getLocationService: GetLocationService, private eventEmitterService: EventEmitterService,
              private _buildingService: BuildingTypeService,
              public dialogRef: MatDialogRef<AddUpdateDispatchComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {


    if (data.dispatch) {
      this.dispatch = data.dispatch;
      this.userSettings.inputString = this.dispatch.address;
      this.marker.lat = parseFloat(this.dispatch.coordinate.substr(0, this.dispatch.coordinate.indexOf(',')));
      this.marker.lng = parseFloat(this.dispatch.coordinate.substr(this.dispatch.coordinate.indexOf(',') + 1, this.dispatch.coordinate.length));
      this.lat = this.marker.lat;
      this.lng = this.marker.lng;
      this.editMode = true;
    } else {
      this.getLocationService.getPosition().then(position => {
        // @ts-ignore
        const coords = position.coords;
        this.lng = coords.longitude;
        this.lat = coords.latitude;
        this.marker.lat = this.lat;
        this.marker.lng = this.lng;
      });
      this.editMode = false;
    }

  }

  ngOnInit(): void {

  }

  cancel(): void {
    this.dialogRef.close('');
  }

  addOrUpdateDispatch() {
    this.dispatch.address = this.userSettings.inputString;
    if (this.editMode) {
      this.dispatchService.editDispatch(this.dispatch, this.dispatch.id).then(
        (result => {
          this.dialogRef.close(result.result);
        })
      );
    } else {
      this.dispatchService.addDispatch(this.dispatch).then(
        (result => {
          this.dialogRef.close(result.result);
        })
      );
    }

  }


  mapClicked(event: any) {
    this.marker = {
      label: 'Dispatch',
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
          that.dispatch.coordinate = lat.toFixed(4) + ',' + lng.toFixed(4);
          const geocoder = new google.maps.Geocoder();
          const latlng = new google.maps.LatLng(lat, lng);
          const request = {
            latLng: latlng
          };
          that.OutputData.lat = lat;
          that.OutputData.lng = lng;
          geocoder.geocode(request, (results, status) => {
              if (status === google.maps.GeocoderStatus.OK) {
                // console.log(results);
                that.userSettings['inputString'] = results[0].formatted_address;
                that.userSettings = Object.assign({}, that.userSettings);
                // that.eventEmitterService.loader.emit(false);
                that.isFindingAddress = false;
                document.getElementById('coordinate').focus();

              } else {
                that.isFindingAddress = false;
              }
            }
          );
        } else {
          that.isFindingAddress = false;
        }
      });
  }

  autoCompleteCallback1(selectedData: any) {
    // console.log(selectedData)
    if (selectedData.data) {

      this.lat = selectedData.data.geometry.location.lat;
      this.lng = selectedData.data.geometry.location.lng;
      this.OutputData.lat = selectedData.data.geometry.location.lat;
      this.OutputData.lng = selectedData.data.geometry.location.lng;

      // this.getData.emit(this.OutputData);
      this.marker = {
        label: 'Dispatch',
        lat: selectedData.data.geometry.location.lat,
        lng: selectedData.data.geometry.location.lng,
        draggable: true
      };
      this.getAddressFromLatLng(this.lat, this.lng);
    }
  }


  markerDragEnd(event: any) {
    this.marker = {
      label: 'Dispatch',
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: true
    };
  }
}
