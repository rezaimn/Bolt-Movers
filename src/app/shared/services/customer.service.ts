import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class CustomerService {
  constructor(private _http: HttpClient) {
  }

  // ...
  public findCustomer(query: String, resultLimit: Number = 10): Promise<any> {
    return this._http.get(`${environment.backendUrl}/api/v1/customer/search?q=${query}&limit=${resultLimit}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  /**
   * login
   */
  public registerCustomer(customerInfo) {
    return this._http.post(`${environment.backendUrl}/api/v1/customer/generate`, {...customerInfo}, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise();
  }

  public editCustomer(customerInfo) {
    return this._http.post(`${environment.backendUrl}/api/v1/customer/profile`, {...customerInfo}, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise();
  }
}
