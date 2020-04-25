import {Component, OnDestroy, OnInit} from '@angular/core';
import {Customer, Order} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {OrdersService} from '../../shared/orders.service';
import {AlertService} from '../../shared/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {CustomerService} from '../../shared/customer.service';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.scss']
})
export class DashboardCustomerComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  customer: Customer;
  ordersSub: Subscription;
  removeSub: Subscription;
  searchStr = '';

  constructor(
    private ordersService: OrdersService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.customerService.getById(params.idCustomer);
        })
      )
      .subscribe((customer) => {
        this.customer = customer;
        this.ordersSub = this.ordersService.getAll().subscribe((orders) => {
          // console.log(posts);
          this.orders = orders.filter((order) => order.idCustomer === customer.id);
          console.log('Orders by customer ID:', this.orders);
        });
      });


  }

  removeOrder(id: string) {
    this.removeSub = this.ordersService.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id);
      this.alert.warning('Post has been deleted!');
    });
  }

  ngOnDestroy(): void {
    if (this.ordersSub) {
      this.ordersSub.unsubscribe();
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }

}
