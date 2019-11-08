
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class BuildingTypeService {
  constructor(private _http: HttpClient) { }
  // ...
  public getAllBuildingTypes() {
    return this._http.get(`${environment.backendUrl}/api/v1/building`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise();
  }
}