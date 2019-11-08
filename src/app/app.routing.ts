import {Routes} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';

import {AuthGuardService as AuthGuard} from './shared/services/auth-gaurd.service';
import {ShowCustomerQuoteComponent} from './shared/components/show-customer-quote/show-customer-quote.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'wizard',
        pathMatch: 'full'
      },
      {
        path: 'wizard',
        canActivate: [AuthGuard],
        loadChildren:
          './wizard-component/wizard.module#WizardModule'
      },
      {
        path: 'furniture-category',
        canActivate: [AuthGuard],
        loadChildren:
          './furniture-category/furniture-category.module#FurnitureCategoryModule'
      },
      {
        path: 'dispatch',
        canActivate: [AuthGuard],
        loadChildren:
          './dispatches/dispatches.module#DispatchesModule'
      },
      {
        path: 'question',
        canActivate: [AuthGuard],
        loadChildren:
          './questions/questions.module#QuestionsModule'
      },
      {
        path: 'customer-management',
        canActivate: [AuthGuard],
        loadChildren:
          './customer-management/customer-management.module#CustomerManagementModule'
      },
      {
        path: 'show-customer-quote',
        canActivate: [AuthGuard],
        component: ShowCustomerQuoteComponent
      },
      // {
      //   path: 'starter',
      //   loadChildren: './starter/starter.module#StarterModule'
      // }
    ]
  },
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule'
  }
];
