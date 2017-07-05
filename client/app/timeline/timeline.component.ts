import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Input() from: Date;
  @Input() to: Date;
  @Output() dateChanged = new EventEmitter();

  timelineForm: FormGroup;

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'mm/dd/yyyy',
    showClearDateBtn: false,
    disableSince: this.getDateObject(new Date())
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.timelineForm = this.fb.group({
      from: {date: this.getDateObject(this.from)},
      to: {date: this.getDateObject(this.to)}
    });
  }

  getDateObject(date: Date) {
    return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}
  }

  onDateChanged(e, type: string) {
    this.dateChanged.next({date: new Date(e.jsdate), type: type});
  }

}
