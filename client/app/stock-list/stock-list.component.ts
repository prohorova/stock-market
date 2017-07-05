import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  @Input() stocks: any[];
  @Output() removeStock = new EventEmitter<number>();

  constructor(private ss: StockService) { }

  ngOnInit() {}

  remove(i: number) {
    this.removeStock.next(i);
  }

}
