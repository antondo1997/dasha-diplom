import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {CommonModule} from '@angular/common';
import {AlertService} from './shared/alert.service';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { DashboardCustomerComponent } from './dashboard-page/dashboard-customer/dashboard-customer.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {defineLocale, ruLocale} from 'ngx-bootstrap/chronos';
import { Page404Component } from './shared/page404/page404.component';
import {TextMaskModule} from 'angular2-text-mask';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

defineLocale('ru', ruLocale);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardPageComponent,
    CreateOrderComponent,
    EditOrderComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    CreateCustomerComponent,
    DashboardCustomerComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TextMaskModule
  ],
  providers: [INTERCEPTOR_PROVIDER, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
