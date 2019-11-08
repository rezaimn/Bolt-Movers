import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// declare var google: any;
@Injectable()
export class GetLocationService {
    constructor(public http: HttpClient) {
    }

    getPosition() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
}
