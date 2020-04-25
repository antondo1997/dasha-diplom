import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from './interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {filter, map, tap} from 'rxjs/operators';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) {
  }

  create(order: Order): Observable<Order> {
    return this.http.post(`${environment.databaseURL}/orders.json`, order)
      .pipe(
        map((res) => {
          return {
            ...order
          };
        })
      );
  }

  getAll(): Observable<Order[]> {
    return this.http.get(`${environment.databaseURL}/orders.json`)
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

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${environment.databaseURL}/orders/${id}.json`)
      .pipe(
        map((order) => {
          return {
            ...order, id
          };
        })
      );
  }

  getOrdersByIdCustomer(id: string) {
    // return this.getAll()
    //   .pipe(
    //     filter((orders) => orders.)
    //   );

    // this.http.get<Order[]>(`${environment.databaseURL}/orders.json`)
    //   .pipe(
    //     tap((data) => {
    //       console.log(data);
    //     }),
    //     map((orders) => orders.filter((order) => order.idCustomer === id))
    //   );
  }


  remove(id: string) {
    return this.http.delete(`${environment.databaseURL}/orders/${id}.json`);
  }

  update(order: Order): Observable<Order> {
    return this.http.patch<Order>(`${environment.databaseURL}/orders/${order.id}.json`, order);
  }

}
