import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer, Order} from '../shared/interfaces';
import {OrdersService} from '../shared/orders.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../shared/alert.service';
import {switchMap} from 'rxjs/operators';
import {CustomerService} from '../shared/customer.service';
import {of} from 'rxjs';

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
    {ru: 'Контекстная реклама', en: 'contextual'}
  ];
  customer: Customer;
  customersList: Customer[];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
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
        // console.log(customer);
        let company: string;
        if (customer.id !== undefined) {
          this.customer = customer;
          company = customer.company;
        } else {
          company = null;
          this.customerService.getAll()
            .subscribe((customers) => {
              this.customersList = customers;
            });
        }
        this.form = new FormGroup({
          company: new FormControl(company, [
            Validators.required,
          ]),
          serviceType: new FormControl('', [
            Validators.required
          ]),
          seo: new FormControl(null, [
            Validators.required
          ]),
          layoutDesigner: new FormControl(null, [
            Validators.required
          ]),
          programmer: new FormControl(null, [
            Validators.required
          ]),
          time: new FormControl(null, [
            Validators.required
          ]),
          price: new FormControl(null, [
            Validators.required
          ])
        });
      });


  }

  submit() {
    this.form.addControl('asd', new FormControl(null, [Validators.required]));
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    // console.log(this.customer);
    let order: Order;
    if (this.customer !== undefined) {
      // idCustomer = this.customer.id;
      order = {
        company: this.customer.company,
        serviceType: this.form.value.serviceType,
        salary: {
          seo: this.form.value.seo,
          layoutDesigner: this.form.value.layoutDesigner,
          programmer: this.form.value.programmer
        },
        time: this.form.value.time,
        price: this.form.value.price,
        idCustomer: this.customer.id
      };
    } else {
      const choseCustomer = this.customersList.filter((customer) => customer.id === this.form.value.company);
      console.log(choseCustomer);
      order = {
        company: choseCustomer[0].company,
        serviceType: this.form.value.serviceType,
        salary: {
          seo: this.form.value.seo,
          layoutDesigner: this.form.value.layoutDesigner,
          programmer: this.form.value.programmer
        },
        time: this.form.value.time,
        price: this.form.value.price,
        idCustomer: choseCustomer[0].id
      };
    }
    // console.log(order);
    // this.ordersService.create(order).subscribe(() => {
    //   this.form.reset();
    //   this.router.navigate(['/dashboard']);
    //   this.alert.success('Order has been created!');
    // });
  }

  calculate() {
    const sum = (this.form.get('seo').value + this.form.get('layoutDesigner').value + this.form.get('programmer').value) * this.form.get('time').value / 30;
    // console.log(+(Math.round(sum + "e+2")  + "e-2"));
    this.form.patchValue({
      price: +(Math.round(Number(sum + 'e+2')) + 'e-2')
    });
    // console.log(this.form.value);
  }
}
