import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class CategoryService {
  constructor(private _http: HttpClient) {
  }

  // ...
  public getAllCategories(): Promise<any>  {
    return this._http.get(`${environment.backendUrl}/api/v1/category`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public getAllCategoriesWithProduct(searchInput): Promise<any> {
    return this._http.get(`${environment.backendUrl}/api/v1/category?product=${searchInput}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }
  public addCategory(body): Promise<any> {
    return this._http.post(`${environment.backendUrl}/api/v1/category`, body, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public editCategory(body, categoryId): Promise<any> {
    return this._http.put(`${environment.backendUrl}/api/v1/category/${categoryId}`, body, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public deleteCategory(categoryId): Promise<any> {
    return this._http.delete(`${environment.backendUrl}/api/v1/category/${categoryId}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }
}
