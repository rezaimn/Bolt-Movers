import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class SettingsService {
  constructor(private _http: HttpClient) {
  }

  // ...
  public getSettings(): Promise<any> {
    return this._http.get(`${environment.backendUrl}/api/v1/setting`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }
}
