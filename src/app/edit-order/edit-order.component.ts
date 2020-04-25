import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Order} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {OrdersService} from '../shared/orders.service';
import {AlertService} from '../shared/alert.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit, OnDestroy {

  form: FormGroup;
  order: Order;
  submitted = false;
  updateSub: Subscription;
  serviceTypes = [
    {ru: 'SEO', en: 'SEO'},
    {ru: 'SMM', en: 'SMM'},
    {ru: 'Контекстная реклама', en: 'contextual'}
  ];

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private alert: AlertService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.ordersService.getById(params.id);
        })
      )
      .subscribe((order) => {
        this.order = order;
        this.form = new FormGroup({
          company: new FormControl(order.company, [
            Validators.required,
          ]),
          serviceType: new FormControl(order.serviceType, [
            Validators.required
          ]),
          seo: new FormControl(order.salary.seo, [
            Validators.required
          ]),
          layoutDesigner: new FormControl(order.salary.layoutDesigner, [
            Validators.required
          ]),
          programmer: new FormControl(order.salary.programmer, [
            Validators.required
          ]),
          time: new FormControl(order.time, [
            Validators.required
          ]),
          price: new FormControl(order.price, [
            Validators.required
          ])
        });
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const newOrder: Order = {
      id: this.order.id,
      company: this.form.value.name,
      serviceType: this.form.value.serviceType,
      salary: {
        seo: this.form.value.seo,
        layoutDesigner: this.form.value.layoutDesigner,
        programmer: this.form.value.programmer
      },
      time: this.form.value.time,
      price: this.form.value.price,
      idCustomer: this.order.idCustomer
    };

    this.updateSub = this.ordersService.update(newOrder).subscribe(() => {
      this.submitted = false;
      this.alert.success('Заказ обновлен!');
      // this.form.reset();
      this.router.navigate(['/dashboard']);
    });
  }

  calculate() {
    const sum = (this.form.get('seo').value + this.form.get('layoutDesigner').value + this.form.get('programmer').value) * this.form.get('time').value / 30;
    this.form.patchValue({
      price: +(Math.round(Number(sum + 'e+2')) + 'e-2')
    });
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
