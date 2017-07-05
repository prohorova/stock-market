import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable()
export class StocksUpdateService {

  socket: any;
  addStock: Observable<Object>;
  private addStockManager: Subject<Object> = new Subject<Object>();
  removeStock: Observable<Object>;
  private removeStockManager: Subject<Object> = new Subject<Object>();

  constructor() {
    this.addStock = this.addStockManager.asObservable();
    this.removeStock = this.removeStockManager.asObservable();
    this.socket = io(environment.baseUrl);
    this.socket.on('addStock', (data) => {
      this.addStockManager.next(data);
    });
    this.socket.on('removeStock', (data) => {
      this.removeStockManager.next(data);
    })
  }

  initConnection() {

  }

  notifyStockAddition(stock: Object) {
    this.socket.emit('addStock', stock);
  }

  notifyStockRemoval(i: number) {
    this.socket.emit('removeStock', i);
  }
}
