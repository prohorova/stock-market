import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  @Output() addStock = new EventEmitter<Object>();
  stockForm: FormGroup;
  inProgress = false;
  error: string;

  constructor(private fb: FormBuilder, private stockService: StockService) { }

  ngOnInit() {
    this.stockForm = this.fb.group({
      stock: ['', Validators.required]
    })
  }

  add(symbol: string) {
    this.error = '';
    this.inProgress = true;
    this.stockService.addStock(symbol).subscribe((data) => {
      this.inProgress = false;
      this.stockForm.controls['stock'].setValue('');
      this.addStock.next(data);
    }, (err) => {
      this.inProgress = false;
      this.error = err.json().message;
    })
  }

}
