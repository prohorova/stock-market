import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class StockService {

  constructor(private http: Http) { }

  getStockList() {
    return this.http.get(`${environment.baseUrl}/stocks`)
      .map(res => res.json());
  }

  addStock(symbol: string) {
    return this.http.get(`${environment.baseUrl}/stocks/add?symbol=${symbol}`)
      .map(res => res.json());
  }

  removeStock(i: number) {
    return this.http.delete(`${environment.baseUrl}/stocks/remove/${i}`)
      .map(res => res.json());
  }

  getStockData(stocks: any[], from: Date, to: Date) {
    let symbols = stocks.map(stock => stock.symbol);
    return this.http.post(`${environment.baseUrl}/stockData`, {symbols, from, to})
      .map(res => res.json());
  }

}
