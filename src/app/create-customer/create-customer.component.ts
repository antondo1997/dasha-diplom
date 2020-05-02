import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../shared/alert.service';
import {Customer, Order} from '../shared/interfaces';
import {CustomerService} from '../shared/customer.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  form: FormGroup;
  idCustomer: string;
  customer: Customer;
  updateMode = false;
  phoneMask = ['+', '3', '7', '5', ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  checkMask = [/[a-zA-Z0-9]/, /[A-Z0-9]/, /[A-Z0-9]/, /[A-Z0-9]/, ' ', /[A-Z0-9]/, /[A-Z0-9]/, /[A-Z0-9]/, /[A-Z0-9]/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' '
    , /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private customerService: CustomerService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.idCustomer = params.id;
          // console.log(params.id);
          return this.customerService.getById(params.id);
        })
      )
      .subscribe((data) => {
        // console.log(data.id);
        if (data.id !== undefined) {
          this.customer = data;
          this.updateMode = true;
        } else {
          this.customer = {
            company: null,
            contactPerson: null,
            telephone: null,
            email: null,
            checkingAccount: null,
            count: 0
          };
        }
        this.form = new FormGroup({
          company: new FormControl(this.customer.company, [
            Validators.required,
          ]),
          contactPerson: new FormControl(this.customer.contactPerson, [
            Validators.required
          ]),
          telephone: new FormControl(this.customer.telephone, [
            Validators.required, Validators.pattern('[+]375\\s[(]\\d{2}[)]\\s\\d{3}([-]\\d{2}){2}')
          ]),
          email: new FormControl(this.customer.email, [
            Validators.required, Validators.email
          ]),
          checkingAccount: new FormControl(this.customer.checkingAccount, [
            Validators.required, Validators.pattern('([a-zA-Z0-9]{4}\\s){2}([0-9]{4}\\s){4}[0-9]{4}')
          ])
        });
      });

  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    let customer: Customer = {
      company: this.form.value.company,
      contactPerson: this.form.value.contactPerson,
      telephone: this.form.value.telephone,
      email: this.form.value.email,
      checkingAccount: this.form.value.checkingAccount,
      count: this.customer.count
    };
    // console.log(customer);
    // console.log(this.updateMode);
    if (!this.updateMode) {
      this.customerService.checkAvailable(customer)
        .subscribe((res: Customer[]) => {
          if (res[0]) {
            console.log(true);
            this.alert.danger('Заказчик уже существует!');
          } else {
            this.customerService.create(customer).subscribe((data) => {
              this.form.reset();
              this.router.navigate(['/dashboard']);
              this.alert.success('Новый заказчик создан!');
            });
          }
        });
    } else {
      customer = {...customer, id: this.idCustomer};
      this.customerService.update(customer).subscribe((cus) => {
        this.form.reset();
        this.router.navigate(['/dashboard']);
        this.alert.success(`Заказчик ${cus.company} обновлен!`);
      });
    }
  }


}
