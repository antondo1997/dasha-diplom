import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrdersService} from '../shared/orders.service';
import {Router} from '@angular/router';
import {AlertService} from '../shared/alert.service';
import {Customer, Order} from '../shared/interfaces';
import {CustomerService} from '../shared/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  form: FormGroup;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      company: new FormControl(null, [
        Validators.required,
      ]),
      contactPerson: new FormControl('', [
        Validators.required
      ]),
      telephone: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required
      ]),
      checkingAccount: new FormControl(null, [
        Validators.required
      ])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const customer: Customer = {
      company: this.form.value.company,
      contactPerson: this.form.value.contactPerson,
      telephone: this.form.value.telephone,
      email: this.form.value.email,
      checkingAccount: this.form.value.checkingAccount
    }
    this.customerService.create(customer).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/dashboard']);
      this.alert.success('New customer has been created!');
    })
  }


}
