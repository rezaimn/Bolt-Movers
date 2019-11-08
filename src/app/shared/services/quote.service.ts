import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class QuoteService {
  constructor(private _http: HttpClient) { }
  // ...
  public calculateQuote(data): Promise<any> {
    return this._http.post(`${environment.backendUrl}/api/v1/qoute/calculate`, { ...data }, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }
  public createQuote(data): Promise<any> {
    return this._http.post(`${environment.backendUrl}/api/v1/qoute`, { ...data }, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public updateQuote(data, quoteId): Promise<any> {
    return this._http.post(`${environment.backendUrl}/api/v1/qoute?qoute_id=${quoteId}`, {...data}, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }


  public getCustomerQuotes(userId): Promise<any> {
    return this._http.get(`${environment.backendUrl}/api/v1/qoute/user/${userId}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public getQuoteById(id): Promise<any> {
    return this._http.get(`${environment.backendUrl}/api/v1/qoute/${id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public sendQuoteAsHtml(data): Promise<any> {
    return this._http.post(`${environment.backendUrl}/api/v1/qoute/email`, {...data}, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

}
