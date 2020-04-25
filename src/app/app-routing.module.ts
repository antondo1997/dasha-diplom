import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreateOrderComponent} from './create-order/create-order.component';
import {EditOrderComponent} from './edit-order/edit-order.component';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {DashboardCustomerComponent} from './dashboard-page/dashboard-customer/dashboard-customer.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardPageComponent},
  {path: 'dashboard/:idCustomer', component: DashboardCustomerComponent},
  {path: 'create/order', component: CreateOrderComponent},
  {path: 'create/order/:idCustomer', component: CreateOrderComponent},
  {path: 'create/customer', component: CreateCustomerComponent},
  {path: 'edit/:id', component: EditOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
