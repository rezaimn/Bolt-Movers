import {Component} from '@angular/core';
import {EventEmitterService} from './shared/services/event-emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading=false;
  constructor(private eventEmitterService:EventEmitterService){
    this.eventEmitterService.loader.subscribe(
      (loader=>{
        this.loading=loader;
      })
    )
  }

}
