
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) { }
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return token ? true : false;
  }

  /**
   * login
   */
  public login(email: String, password: String) {
    // console.log(email, password)
    return this._http.post(`${environment.backendUrl}/api/v1/admin/signin`, { email, password }).toPromise().then((res: any) => {
      console.log(res)
      localStorage.setItem('token', res.result.token.token);
      localStorage.setItem('userName', res.result.user.firstname);
      localStorage.setItem('email', res.result.user.email);
    });
  }
}