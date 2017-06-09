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
      'avatar': this.expenseName.charAt(0),
      'name': this.expenseName,
      'value': this.expenseSum,
      };
    console.log(this.record);
    this.dialogRef.close(this.record);
  }

}


