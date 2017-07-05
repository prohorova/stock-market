import { Component, OnInit } from '@angular/core';
import { StockService } from './stock.service';
import { StocksUpdateService } from './stocks-update.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  stocks: any[];
  stockData: {};
  from: Date;
  to: Date;

  constructor(private stockService: StockService,
              private stocksUpdateService: StocksUpdateService) {
  }

  ngOnInit() {
    this.getStocks();
    this.to = new Date();
    this.from = new Date();
    this.from.setFullYear(this.from.getFullYear() - 1);

    this.stocksUpdateService.addStock.subscribe((stock: Object) => {
      this.stocks = this.stocks.concat(stock);
      this.getStockData();
    });

    this.stocksUpdateService.removeStock.subscribe((i: number) => {
      this.stocks = this.stocks.slice(0, i).concat(this.stocks.slice(i+1));
      this.getStockData();
    });
  }

  getStocks() {
    this.stockService.getStockList().subscribe((stocks) => {
      this.stocks = stocks;
      this.getStockData();
    })
  }

  getStockData() {
    if (this.stocks.length) {
      this.stockService.getStockData(this.stocks, this.from, this.to).subscribe((data) => {
        this.stockData = data;
      })
    } else {
      this.stockData = null;
    }
  }

  onAddStock(stock: Object) {
    this.stocksUpdateService.notifyStockAddition(stock);
  }

  onRemoveStock(i: number) {
    this.stockService.removeStock(i).subscribe((data) => {
      this.stocksUpdateService.notifyStockRemoval(data['index']);
    });
  }

  onDateChanged(e) {
    if (e.type === 'from') {
      this.from = e.date;
    } else if (e.type === 'to') {
      this.to = e.date;
    }
    this.getStockData();
  }
}
