import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class DispatchService {
  constructor(private _http: HttpClient) {
  }

  // ...
  public getAllDispatches(): Promise<any> {
    return this._http.get(`${environment.backendUrl}/api/v1/dispatch`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public addDispatch(body): Promise<any> {
    return this._http.post(`${environment.backendUrl}/api/v1/dispatch`, body, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public editDispatch(body, dispatchId): Promise<any> {
    return this._http.put(`${environment.backendUrl}/api/v1/dispatch/${dispatchId}`, body, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public deleteDispatch(dispatchId): Promise<any> {
    return this._http.delete(`${environment.backendUrl}/api/v1/dispatch/${dispatchId}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }
}
