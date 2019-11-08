import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class FurnitureService {
  constructor(private _http: HttpClient) {
  }

  public getAllCategories(): Promise<any> {
    return this._http.get(`${environment.backendUrl}/api/v1/category`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public getCategoryFurniture(categoryId): Promise<any> {
    return this._http.get(`${environment.backendUrl}/api/v1/category/${categoryId}?product`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public addFurniture(body): Promise<any> {
    return this._http.post(`${environment.backendUrl}/api/v1/product`, body, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public editFurniture(body, furnitureId): Promise<any> {
    return this._http.put(`${environment.backendUrl}/api/v1/product/${furnitureId}`, body, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public deleteFurniture(furnitureId): Promise<any> {
    return this._http.delete(`${environment.backendUrl}/api/v1/product/${furnitureId}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }
}
