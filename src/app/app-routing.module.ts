import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreateOrderComponent} from './create-order/create-order.component';
import {EditOrderComponent} from './edit-order/edit-order.component';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {DashboardCustomerComponent} from './dashboard-page/dashboard-customer/dashboard-customer.component';
import {Page404Component} from './shared/page404/page404.component';
import {AuthGuard} from './shared/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/:idCustomer', component: DashboardCustomerComponent, canActivate: [AuthGuard]},
  // {path: 'create/order', component: CreateOrderComponent, canActivate: [AuthGuard]},
  // {path: 'create/order/:idCustomer', component: CreateOrderComponent, canActivate: [AuthGuard]},
  // {path: 'create/customer', component: CreateCustomerComponent, canActivate: [AuthGuard]},
  {
    path: 'create', children: [
      {path: 'customer', component: CreateCustomerComponent},
      {path: 'order', component: CreateOrderComponent},
      {path: 'order/:idCustomer', component: CreateOrderComponent},
    ], canActivate: [AuthGuard]
  },
  {
    path: 'edit', children: [
      {path: 'order/:id', component: EditOrderComponent},
      {path: 'customer/:id', component: CreateCustomerComponent},
    ], canActivate: [AuthGuard]
  },
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
