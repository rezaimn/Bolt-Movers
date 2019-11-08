import 'hammerjs';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

import {DemoMaterialModule} from '../demo-material-module';
import {CdkTableModule} from '@angular/cdk/table';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {WizardRoutes} from './wizard.routing';

import {WizardComponent} from './wizard.component';
import {MapAddressComponent} from './shared/components/map-address/map-address.component';
import {AgmCoreModule} from '@agm/core';
import {SharedModule} from '../shared/shared.module';
import {AssetsManagementComponent} from './shared/components/assets-management/assets-management.component';
import {NgxGeoautocompleteModule} from 'ngx-geoautocomplete';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WizardRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    SharedModule,
    NgxGeoautocompleteModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyACckusHX9FL5LLcLfNvrOwxQQ-pBbwUDw'
    })
  ],
  providers: [],
  entryComponents: [],
  exports: [
    WizardComponent
  ],
  declarations: [
    WizardComponent,
    MapAddressComponent,
    AssetsManagementComponent,

  ]
})
export class WizardModule {}
