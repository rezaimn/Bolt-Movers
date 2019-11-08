import {NgModule} from '@angular/core';

import {MenuItems} from './menu-items/menu-items';
import {AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective} from './accordion';
import {AgmCoreModule} from '@agm/core';
import {DemoMaterialModule} from '../demo-material-module';
import {MatDialogModule} from '@angular/material';

@NgModule({
  imports:[
    DemoMaterialModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyACckusHX9FL5LLcLfNvrOwxQQ-pBbwUDw'
    })
  ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,

  ],
  exports: [
    DemoMaterialModule,
    MatDialogModule,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    AgmCoreModule,

   ],
  providers: [ MenuItems ]
})
export class SharedModule { }
