import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DemoMaterialModule} from '../demo-material-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomerManagementComponent} from './customer-management.component';
import {StarterRoutes} from './customer-management.routing';
import {MatDialogModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import {EditCustomerComponent} from './edit-customer/edit-customer.component';

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


  ],
  declarations: [
    CustomerManagementComponent,
    EditCustomerComponent
  ],
  entryComponents: [EditCustomerComponent]
})
export class CustomerManagementModule {
}
