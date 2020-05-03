import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer, LIST_SERVICE_TYPE, Order, serviceTypes, Task} from '../shared/interfaces';
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
  formTask: FormGroup;
  serviceTypes = serviceTypes;
  customer: Customer;
  customersList: Customer[];
  idCustomer: string;
  taskList: Task[];
  employees: { specialist: string, rate: number }[];
  sumHours = 0;
  bsConfig: Partial<BsDatepickerConfig>;
  submitted = false;

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
        this.formTask = new FormGroup({
          name: new FormControl(null, [Validators.required]),
          specialist: new FormControl(null, [Validators.required]),
          setHour: new FormControl(null, [Validators.required]),
        });
      });

  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    // console.log(this.form.value);
    // console.log(this.customer);
    const dates: Date[] = this.form.value.date;
    const hoursRate: Task[] = [];
    this.taskList.forEach((item, idx) => {
      // order.hours_rate[item.name] = this.form.value[item.name];
      hoursRate.push({
        name: item.name,
        specialist: item.specialist,
        setHour: this.controls[idx].value
      });
    });
    const order: Order = {
      company: this.customer.company,
      date: `${dates[0].getDate()}.${dates[0].getMonth() + 1}.${dates[0].getFullYear()} - ${dates[1].getDate()}.${dates[1].getMonth() + 1}.${dates[1].getFullYear()}`,
      serviceType: this.form.value.serviceType,
      hours_rate: hoursRate,
      price: +(Math.round(Number((this.sumHours * 36.95) + 'e+2')) + 'e-2'),
      idCustomer: this.customer.id
    };
    console.log('Create order:', order);

    this.ordersService.create(order).subscribe(() => {
      this.customerService.setCountOrder(this.idCustomer, 1);
      this.submitted = true;
      this.form.reset();
      this.router.navigate(['/dashboard', this.idCustomer]);
      this.alert.success('Заказ создан!');
    });
  }

  onChangeType() {
    // console.log('Customer Data:', this.customer);
    // console.log('List:', LIST_SERVICE_TYPE[this.form.value.serviceType]);
    this.taskList = LIST_SERVICE_TYPE[this.form.value.serviceType];
    // console.log(this.taskList);
    this.employees = this.serviceTypes.filter((type) => type.en === this.form.value.serviceType)[0].employees;
    this.sumHours = 0;
    const tasksArray = new FormArray([]);
    for (const item of this.taskList) {
      // console.log(item);
      // this.form.addControl(`${i++}`, new FormControl(item.defaultHour, [Validators.required]));
      tasksArray.push(new FormControl(item.defaultHour, [Validators.required]));
    }
    this.form = new FormGroup({
      idCustomer: new FormControl(this.idCustomer, [
        Validators.required,
      ]),
      date: new FormControl(this.form.value.date, [
        Validators.required,
      ]),
      serviceType: new FormControl(this.form.value.serviceType, [
        Validators.required
      ]),
      tasks: tasksArray
    });
    this.formTask.setValue({
      name: null, specialist: '', setHour: null
    });
    this.calculate_sum_hours();
    // console.log('Form change:', this.form.value);
    // console.log('Form tasks:', (this.form.get('tasks') as FormArray).controls[0].value);
  }

  get controls() { // a getter!
    return (this.form.get('tasks') as FormArray).controls;
  }

  onChangeCompany() {
    this.customer = this.customersList.filter((customer) => customer.id === this.form.value.idCustomer)[0];
    this.idCustomer = this.customer.id;
  }

  calculate_sum_hours() {
    this.sumHours = 0;
    // console.log(employees);
    this.taskList.forEach((task, idx) => {
      if (this.taskList.hasOwnProperty(idx)) {
        this.employees.forEach((employee) => {
          if (task.specialist === employee.specialist) {
            this.sumHours += employee.rate * this.controls[idx].value;
          }
        });
      }
    });
    // this.sumHours = +(Math.round(Number(this.sumHours + 'e+2')) + 'e-2');
  }

  deleteTask(idx: number) {
    // console.log(itemEn);
    this.taskList.splice(idx, 1);
    (this.form.get('tasks') as FormArray).removeAt(idx);
    this.calculate_sum_hours();
    // console.log('after delete taskList:', this.taskList);
    // console.log('Form tasks:', (this.form.get('tasks') as FormArray).controls);
  }

  addNewTask() {
    if (this.formTask.invalid) {
      return;
    }
    console.log(this.formTask.value);
    const newTask: Task = {
      name: this.formTask.value.name,
      specialist: this.formTask.value.specialist,
      setHour: this.formTask.value.setHour
    };
    this.taskList.push(newTask);
    (this.form.get('tasks') as FormArray).push(new FormControl(newTask.setHour, [Validators.required]));
    this.formTask.setValue({
      name: null, specialist: '', setHour: null
    });
    this.calculate_sum_hours();
  }
}
