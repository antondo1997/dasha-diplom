import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer, LIST_SERVICE_TYPE, Order} from '../shared/interfaces';
import {OrdersService} from '../shared/orders.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../shared/alert.service';
import {switchMap} from 'rxjs/operators';
import {CustomerService} from '../shared/customer.service';
import {of} from 'rxjs';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  form: FormGroup;
  serviceTypes = [
    {ru: 'SEO', en: 'SEO'},
    {ru: 'SMM', en: 'SMM'},
    {ru: 'Контекстная реклама', en: 'Контекстуальный'}
  ];
  customer: Customer;
  customersList: Customer[];
  idCustomer: string;
  list;
  sumHours = 0;
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    private customerService: CustomerService,
  ) {
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-red'});
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.customerService.getById(params.idCustomer);
        })
      )
      .subscribe((customer) => {
        if (customer.id !== undefined) {
          this.customer = customer;
          this.idCustomer = customer.id;
        } else {
          this.idCustomer = '';
          this.customerService.getAll()
            .subscribe((customers) => {
              this.customersList = customers;
            });
        }
        this.form = new FormGroup({
          idCustomer: new FormControl(this.idCustomer, [
            Validators.required,
          ]),
          date: new FormControl(null, [
            Validators.required,
          ]),
          serviceType: new FormControl('', [
            Validators.required
          ])
        });
      });


  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    // console.log(this.form.value);
    // console.log(this.customer);
    const dates: Date[] = this.form.value.date;
    const order: Order = {
      company: this.customer.company,
      date: `${dates[0].getDate()}.${dates[0].getMonth() + 1}.${dates[0].getFullYear()} - ${dates[1].getDate()}.${dates[1].getMonth() + 1}.${dates[1].getFullYear()}`,
      serviceType: this.form.value.serviceType,
      hours_rate: {},
      price: +(Math.round(Number((this.sumHours * 36.95) + 'e+2')) + 'e-2'),
      idCustomer: this.customer.id
    };
    this.list.forEach((item) => {
      order.hours_rate[item.en] = this.form.value[item.en];
    });
    console.log('Create order:', order);

    this.ordersService.create(order).subscribe(() => {
      this.customerService.setCountOrder(this.idCustomer, 1);
      this.form.reset();
      this.router.navigate(['/dashboard', this.idCustomer]);
      this.alert.success('New order has been created!');
    });
  }

  testCount() {
  }

  calculate() {
    // const sum = (this.form.get('seo').value + this.form.get('layoutDesigner').value + this.form.get('programmer').value) * this.form.get('time').value / 30;
    // console.log(+(Math.round(sum + "e+2")  + "e-2"));
    const sum = this.sumHours * 36.95;
    this.form.patchValue({
      price: +(Math.round(Number(sum + 'e+2')) + 'e-2')
    });
  }

  onChangeType() {
    console.log('Customer Data:', this.customer);
    // console.log('List:', LIST_SERVICE_TYPE[this.form.value.serviceType]);
    this.list = LIST_SERVICE_TYPE[this.form.value.serviceType];
    this.sumHours = 0;
    this.form = new FormGroup({
      idCustomer: new FormControl(this.idCustomer, [
        Validators.required,
      ]),
      date: new FormControl(this.form.value.date, [
        Validators.required,
      ]),
      serviceType: new FormControl(this.form.value.serviceType, [
        Validators.required
      ])
    });
    for (const item of this.list) {
      this.form.addControl(item.en, new FormControl(null, [Validators.required]));
    }
    // console.log('Form change:', this.form.value);
  }

  onChangeCompany() {
    this.customer = this.customersList.filter((customer) => customer.id === this.form.value.idCustomer)[0];
    this.idCustomer = this.customer.id;
  }

  calculate_sum_hours() {
    this.sumHours = 0;
    for (const item of this.list) {
      this.sumHours += this.form.get(item.en).value * item.rate;
    }
    this.sumHours = +(Math.round(Number(this.sumHours + 'e+2')) + 'e-2');
  }
}
