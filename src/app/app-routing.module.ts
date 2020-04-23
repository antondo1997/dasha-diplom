import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreateOrderComponent} from './create-order/create-order.component';
import {EditOrderComponent} from './edit-order/edit-order.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardPageComponent},
  {path: 'create', component: CreateOrderComponent},
  {path: 'edit/:id', component: EditOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
