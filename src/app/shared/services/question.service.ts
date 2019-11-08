import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class QuestionService {
  constructor(private _http: HttpClient) {
  }

  // ...
  public getAllQuestions(): Promise<any> {
    return this._http.get(`${environment.backendUrl}/api/v1/question`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public addQuestion(body): Promise<any> {
    return this._http.post(`${environment.backendUrl}/api/v1/question`, body, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public editQuestion(body, questionId): Promise<any> {
    return this._http.put(`${environment.backendUrl}/api/v1/question/${questionId}`, body, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }

  public deleteQuestion(questionId): Promise<any> {
    return this._http.delete(`${environment.backendUrl}/api/v1/question/${questionId}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }).toPromise().then(res => res).catch(err => err);
  }
}
