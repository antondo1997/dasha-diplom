import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer, Order} from './interfaces';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public numCount$ = new Subject<{id: string, count: number}>();

  constructor(
    private http: HttpClient
  ) {
  }

  create(customer: Customer) {
    return this.http.post(`${environment.databaseURL}/customers.json`, customer);
  }

  getAll(): Observable<Customer[]> {
    return this.http.get(`${environment.databaseURL}/customers.json`)
      .pipe(
        map(
          (response: { [key: string]: any }) => {
            // console.log(response);
            return Object
              .keys(response)
              .map(key => ({
                ...response[key],
                id: key
              }));
          }
        )
      );
  }

  getById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${environment.databaseURL}/customers/${id}.json`)
      .pipe(
        map((customer) => {
          return {...customer, id};
        })
      );
  }

  setCountOrder(id: string, num: number) {
    this.http.get<number>(`${environment.databaseURL}/customers/${id}/count.json`)
      .subscribe((count) => {
        // console.log('Count:', count);
        // console.log(typeof count);
        this.http.patch<{count: number}>(`${environment.databaseURL}/customers/${id}.json`, {count: count + num})
          .subscribe((res) => {
            console.log(res);
            this.numCount$.next({id, count: res.count});
          });
      });
  }

  remove(id: string) {
    return this.http.delete(`${environment.databaseURL}/customers/${id}.json`);
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${environment.databaseURL}/customers/${customer.id}.json`, customer);
  }

}
