import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// declare var google: any;
@Injectable()
export class EventEmitterService {
  constructor(public http: HttpClient) {
  }

  loader = new EventEmitter<boolean>();
}

