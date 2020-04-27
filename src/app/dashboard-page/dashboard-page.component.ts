import {Component, OnDestroy, OnInit} from '@angular/core';
import {Customer, Order} from '../shared/interfaces';
import {Subject, Subscription} from 'rxjs';
import {AlertService} from '../shared/alert.service';
import {OrdersService} from '../shared/orders.service';
import {CustomerService} from '../shared/customer.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  customers: Customer[] = [];
  removeCustomerSub: Subscription;
  customersSub: Subscription;
  customerNumCountSub: Subscription;
  isLoading = true;

  constructor(
    private alert: AlertService,
    private customerService: CustomerService
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.customersSub = this.customerService.getAll()
      .subscribe((customers) => {
        this.customers = customers;
        this.isLoading = false;
      });

    this.customerNumCountSub = this.customerService.numCount$
      .subscribe((data) => {
        const index = this.customers.indexOf(this.customers.filter(customer => customer.id === data.id)[0]);
        // console.log(this.customers.filter(customer => customer.id === data.id)[0]);
        // console.log(index);
        this.customers[index].count = data.count;
      });
  }

  removeCustomer(id: string) {
    this.removeCustomerSub = this.customerService.remove(id).subscribe(() => {
      this.customers = this.customers.filter(customer => customer.id !== id);
      this.alert.warning('Customer has been deleted!');
    });
  }

  ngOnDestroy(): void {
    if (this.customersSub) {
      this.customersSub.unsubscribe();
    }
    if (this.removeCustomerSub) {
      this.removeCustomerSub.unsubscribe();
    }
    if (this.customerNumCountSub) {
      this.customerNumCountSub.unsubscribe();
    }
  }

}
