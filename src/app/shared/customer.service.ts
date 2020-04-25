import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from './interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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

}
