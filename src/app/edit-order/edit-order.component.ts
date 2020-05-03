import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {LIST_SERVICE_TYPE, Order, serviceTypes, Task} from '../shared/interfaces';
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
  formTask: FormGroup;
  order: Order;
  updateSub: Subscription;
  serviceTypes = serviceTypes;
  taskList: Task[];
  employees: { specialist: string, rate: number }[];
  sumHours = 0;
  bsConfig: Partial<BsDatepickerConfig>;
  submitted = false;

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
        console.log(order.hours_rate);
        this.order = order;
        // this.list = LIST_SERVICE_TYPE[order.serviceType];
        this.employees = this.serviceTypes.filter((type) => type.en === order.serviceType)[0].employees;
        this.taskList = order.hours_rate;
        const tasksArray = new FormArray([]);
        this.taskList.forEach((task, idx) => {
          // this.form.addControl(task.en, new FormControl(order.hours_rate[task.en], [Validators.required]));
          tasksArray.push(new FormControl(task.setHour, [Validators.required]));
        });
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
          tasks: tasksArray
        });
        this.formTask = new FormGroup({
          name: new FormControl(null, [Validators.required]),
          specialist: new FormControl('', [Validators.required]),
          setHour: new FormControl(null, [Validators.required]),
        });
        this.calculate_sum_hours();
        // console.log('Order:', order.date);
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const dates: Date[] = this.form.value.date;
    let date: string;
    if (this.form.value.date.length === 2) {
      date = `${dates[0].getDate()}.${dates[0].getMonth() + 1}.${dates[0].getFullYear()} - ${dates[1].getDate()}.${dates[1].getMonth() + 1}.${dates[1].getFullYear()}`;
    } else {
      date = this.form.value.date;
    }
    const newOrder: Order = {
      id: this.order.id,
      company: this.form.value.name,
      serviceType: this.form.value.serviceType,
      hours_rate: [],
      date,
      price: +(Math.round(Number((this.sumHours * 36.95) + 'e+2')) + 'e-2'),
      idCustomer: this.order.idCustomer
    };
    this.taskList.forEach((item, idx) => {
      newOrder.hours_rate.push({
        name: item.name,
        specialist: item.specialist,
        setHour: this.controls[idx].value
      });
    });

    this.updateSub = this.ordersService.update(newOrder).subscribe(() => {
      this.submitted = false;
      this.alert.success('Заказ обновлен!');
      this.form.reset();
      this.router.navigate(['/dashboard', this.order.idCustomer]);
    });
  }

  onChangeType() {
    // console.log('Customer Data:', this.customer);
    // console.log('List:', LIST_SERVICE_TYPE[this.form.value.serviceType]);
    this.taskList = LIST_SERVICE_TYPE[this.form.value.serviceType];
    this.employees = this.serviceTypes.filter((type) => type.en === this.form.value.serviceType)[0].employees;
    this.sumHours = 0;
    const tasksArray = new FormArray([]);
    for (const item of this.taskList) {
      tasksArray.push(new FormControl(item.defaultHour, [Validators.required]));
    }
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
      task: tasksArray
    });
    this.formTask.setValue({
      name: null, specialist: '', setHour: null
    });
    this.calculate_sum_hours();
  }

  get controls() { // a getter!
    return (this.form.get('tasks') as FormArray).controls;
  }

  calculate_sum_hours() {
    this.sumHours = 0;
    const employees = this.serviceTypes.filter((type) => type.en === this.form.value.serviceType)[0].employees;
    this.taskList.forEach((task, idx) => {
      if (this.taskList.hasOwnProperty(idx)) {
        employees.forEach((employee) => {
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

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
