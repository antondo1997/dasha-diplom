import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/alert.service';
import {OrdersService} from '../shared/orders.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  postsSub: Subscription;
  removeSub: Subscription;
  searchStr = '';

  constructor(
    private ordersService: OrdersService,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
    this.postsSub = this.ordersService.getAll().subscribe((orders) => {
      // console.log(posts);
      this.orders = orders;
      console.log('Orders:', this.orders);
    });
  }

  removeOrder(id: string) {
    this.removeSub = this.ordersService.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id);
      this.alert.warning('Order has been deleted!');
    });
  }

  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }

}
