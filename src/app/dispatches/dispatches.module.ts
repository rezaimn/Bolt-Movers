import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DemoMaterialModule} from '../demo-material-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DispatchesComponent} from './dispatches.component';
import {StarterRoutes} from './dispatches.routing';
import {MatDialogModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import {NgxGeoautocompleteModule} from 'ngx-geoautocomplete';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StarterRoutes),
    DemoMaterialModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    SharedModule,
    NgxGeoautocompleteModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyACckusHX9FL5LLcLfNvrOwxQQ-pBbwUDw'
    }),
  ],
  declarations: [
    DispatchesComponent
  ],
})
export class DispatchesModule {
}
