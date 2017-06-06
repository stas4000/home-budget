import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-record-dialog',
  templateUrl: './new-record-dialog.component.html',
  styleUrls: ['./new-record-dialog.component.css']
})
export class NewRecordDialogComponent implements OnInit {
  expenseName: string;
  expenseSum: any;
  record: any;
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
        'avatar': this.expenseName.charAt(0),
        'name': this.expenseName,
        'value': this.expenseSum,
        'date': this.getDate()
      };
    this.dialogRef.close(this.record);
  }

  getDate() {
    let today: any = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '/' + mm + '/' + yyyy;
    return today;
  }

}


