import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LIST_SERVICE_TYPE, Order} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {OrdersService} from '../shared/orders.service';
import {AlertService} from '../shared/alert.service';
import {switchMap} from 'rxjs/operators';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit, OnDestroy {

  form: FormGroup;
  order: Order;
  // submitted = false;
  updateSub: Subscription;
  serviceTypes = [
    {ru: 'SEO', en: 'SEO'},
    {ru: 'SMM', en: 'SMM'},
    {ru: 'Контекстная реклама', en: 'Контекстуальный'}
  ];
  list;
  sumHours = 0;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private alert: AlertService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-red'});
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.ordersService.getById(params.id);
        })
      )
      .subscribe((order) => {
        this.order = order;
        this.list = LIST_SERVICE_TYPE[order.serviceType];
        this.form = new FormGroup({
          company: new FormControl(order.company, [
            Validators.required,
          ]),
          date: new FormControl(order.date, [
            Validators.required,
          ]),
          serviceType: new FormControl(order.serviceType, [
            Validators.required
          ]),
        });
        // console.log('Order:', order.date);
        for (const item of this.list) {
          this.form.addControl(item.en, new FormControl(order.hours_rate[item.en], [Validators.required]));
          this.sumHours += this.form.get(item.en).value * item.rate;
        }
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    // this.submitted = true;
    const dates: Date[] = this.form.value.date;
    let date: string;
    if (this.form.value.date.length === 2) {
      date = `${dates[0].getDate()}.${dates[0].getMonth() + 1}.${dates[0].getFullYear()} - ${dates[1].getDate()}.${dates[1].getMonth() + 1}.${dates[1].getFullYear()}`
    } else {
      date = this.form.value.date;
    }
    const newOrder: Order = {
      id: this.order.id,
      company: this.form.value.name,
      serviceType: this.form.value.serviceType,
      hours_rate: {},
      date,
      price: +(Math.round(Number((this.sumHours * 36.95) + 'e+2')) + 'e-2'),
      idCustomer: this.order.idCustomer
    };
    this.list.forEach((item) => {
      newOrder.hours_rate[item.en] = this.form.value[item.en];
    });

    this.updateSub = this.ordersService.update(newOrder).subscribe(() => {
      // this.submitted = false;
      this.alert.success('Заказ обновлен!');
      // this.form.reset();
      this.router.navigate(['/dashboard']);
    });
  }

  onChangeType() {
    // console.log('Customer Data:', this.customer);
    // console.log('List:', LIST_SERVICE_TYPE[this.form.value.serviceType]);
    this.list = LIST_SERVICE_TYPE[this.form.value.serviceType];
    this.sumHours = 0;
    this.form = new FormGroup({
      company: new FormControl(this.order.company, [
        Validators.required,
      ]),
      date: new FormControl(this.form.value.date, [
        Validators.required,
      ]),
      serviceType: new FormControl(this.form.value.serviceType, [
        Validators.required
      ]),
    });
    for (const item of this.list) {
      this.form.addControl(item.en, new FormControl(null, [Validators.required]));
    }
  }

  calculate_sum_hours() {
    this.sumHours = 0;
    for (const item of this.list) {
      this.sumHours += this.form.get(item.en).value * item.rate;
    }
    this.sumHours = +(Math.round(Number(this.sumHours + 'e+2')) + 'e-2');

    // this.form.patchValue({
    //   price: +(Math.round(Number((this.sumHours * 36.95) + 'e+2')) + 'e-2')
    // });
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
