import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Order, Post} from '../shared/interfaces';
import {OrdersService} from '../shared/orders.service';
import {Router} from '@angular/router';
import {AlertService} from '../shared/alert.service';

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
    {ru: 'Контекстная реклама', en: 'contextual'},
    {ru: 'Аудит сайта', en: 'audit'},
  ];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [
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
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const order: Order = {
      name: this.form.value.name,
      serviceType: this.form.value.serviceType,
      salary: {
        seo: this.form.value.seo,
        layoutDesigner: this.form.value.layoutDesigner,
        programmer: this.form.value.programmer
      },
      time: this.form.value.time,
      price: this.form.value.price
    };
    console.log(order);
    this.ordersService.create(order).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/dashboard']);
      this.alert.success('Post has been created!');
    });
    // console.log(post);
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
