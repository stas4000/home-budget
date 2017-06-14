import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
declare let moment: any;


@Component({
  selector: 'app-new-record-dialog',
  templateUrl: './new-record-dialog.component.html',
  styleUrls: ['./new-record-dialog.component.css']
})
export class NewRecordDialogComponent implements OnInit {
  expenseName: string;
  expenseSum: any;
  dateChoice: any;
  record: any;
  recurring: any;
  recurringChoice: Array<any>;
  labels: Array<any>;
  label: any;
  constructor(public dialogRef: MdDialogRef<NewRecordDialogComponent>) {
    this.recurringChoice = [
      {
        'value': true,
        'option': 'כן'
      },
      {
        'value': false,
        'option': 'לא'
      }
    ];
    this.labels = [
      {
        'value': 'home',
        'option': 'בית',
        'avatar': 'home'
      },
      {
        'value': 'car',
        'option': 'רכב',
        'avatar': 'directions_car'
      },
      {
        'value': 'work',
        'option': 'עבודה',
        'avatar': 'work'
      },
      {
        'value': 'entertainment',
        'option': 'בידור',
        'avatar': 'local_activity'
      },
      {
        'value': 'vacation',
        'option': 'חופשה',
        'avatar': 'flight_takeoff'
      },
      {
        'value': 'school',
        'option': 'לימודים',
        'avatar': 'school'
      },
      {
        'value': 'kids',
        'option': 'ילדים',
        'avatar': 'face'
      },
      {
        'value': 'clothing',
        'option': 'ביגוד',
        'avatar': 'loyalty'
      },
      {
        'value': 'food',
        'option': 'אוכל',
        'avatar': 'local_dining'
      },
    ];
  }
  ngOnInit() {
  }

  submit() {
    if (Math.sign(this.expenseSum) === 1) {
      this.expenseSum = '+' + this.expenseSum;
    }
    this.record = {
      'date': moment(this.dateChoice).format('DD/MM/YYYY'),
      'recurring': this.recurring,
      'avatar': '',
      'name': this.expenseName,
      'value': this.expenseSum,
      'label': this.label
      };
    for(let key in this.labels) {
      if(this.labels[key]['value'] == this.label) {
        this.record.avatar = this.labels[key]['avatar']
      }
    }
    console.log(this.record);
    this.dialogRef.close(this.record);
  }

}


