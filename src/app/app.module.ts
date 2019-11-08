import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routing';
import {AppComponent} from './app.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FullComponent} from './layouts/full/full.component';
import {AppHeaderComponent} from './layouts/full/header/header.component';
import {AppSidebarComponent} from './layouts/full/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './demo-material-module';
import {ToastrModule} from 'ngx-toastr';

import {SharedModule} from './shared/shared.module';
import {SpinnerComponent} from './shared/spinner.component';
import {GetLocationService} from './shared/services/get-location.service';
import {AddRoomComponent} from './wizard-component/shared/components/add-room/add-room.component';
import {RemoveProductDialogComponent} from './wizard-component/shared/components/remove-product-dialog/remove-product-dialog.component';
import {RemoveRoomDialogComponent} from './wizard-component/shared/components/remove-room-dialog/remove-room-dialog.component';
import {EventEmitterService} from './shared/services/event-emitter.service';
import {AuthModule} from './auth/auth.module';
import {AuthService} from './shared/services/auth.service';
import {AuthGuardService} from './shared/services/auth-gaurd.service';
import {CustomerService} from './shared/services/customer.service';
import {CategoryService} from './shared/services/category.service';
import {BuildingTypeService} from './shared/services/building-type.service';
import {TruckService} from './shared/services/truck.service';
import {QuoteService} from './shared/services/quote.service';
import {FurnitureService} from './shared/services/furniture.service';
import {MatDialogModule} from '@angular/material';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AddFurnitureComponent} from './furniture-category/shared/add-furniture/add-furniture.component';
import {DeleteConfirmationComponent} from './shared/components/delete-confirmation/delete-confirmation.component';
import {ShowCustomerQuoteComponent} from './shared/components/show-customer-quote/show-customer-quote.component';
import {AddCategoryComponent} from './furniture-category/shared/add-category/add-category.component';
import {ClearCacheService} from './shared/services/clear-cache.service';
import {SettingsService} from './shared/services/settings.service';
import {AddUpdateDispatchComponent} from './dispatches/add-update-dispatch/add-update-dispatch.component';
import {DispatchService} from './shared/services/dispatch.service';
import {NgxGeoautocompleteModule} from 'ngx-geoautocomplete';
import {QuestionService} from './shared/services/question.service';
import {AddUpdateQuestionComponent} from './questions/add-update-question/add-update-question.component';
import {WizardModule} from './wizard-component/wizard.module';
import {QuestionsModalComponent} from './wizard-component/shared/components/questions-modal/questions-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    AddRoomComponent,
    RemoveProductDialogComponent,
    RemoveRoomDialogComponent,
    AddFurnitureComponent,
    AddUpdateQuestionComponent,
    DeleteConfirmationComponent,
    ShowCustomerQuoteComponent,
    AddCategoryComponent,
    AddUpdateDispatchComponent,
    QuestionsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatDialogModule,
    FormsModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule,
    NgxGeoautocompleteModule,
    WizardModule
  ],
  providers: [
    EventEmitterService,
    GetLocationService,
    AuthGuardService,
    AuthService,
    CustomerService,
    SettingsService,
    BuildingTypeService,
    CategoryService,
    DispatchService,
    QuestionService,
    ClearCacheService,
    TruckService,
    QuoteService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    FurnitureService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AddRoomComponent,
    RemoveProductDialogComponent,
    DeleteConfirmationComponent,
    RemoveRoomDialogComponent,
    AddFurnitureComponent,
    AddCategoryComponent,
    AddUpdateQuestionComponent,
    QuestionsModalComponent,
    AddUpdateDispatchComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
