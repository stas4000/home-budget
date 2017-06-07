import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import { NewRecordDialogComponent } from '../new-record-dialog/new-record-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  records: any;
  sum: any;
  mathString: string;
  date: string;
  summeryArray: any = [
  {
    'date': '9/6/2017',
    'sumPositive': ['10000', '25000'],
    'sumNegative': ['-500', '-2900']
  },
  {
    'date': '8/6/2017',
    'sumPositive': ['500', '35120'],
    'sumNegative': ['-270', '-9852']
  }];
  constructor(public dialog: MdDialog) {
    this.records = [
      {
        'avatar': 'מ',
        'name': 'מכונית חדשה',
        'value': '+1200',
        'date': '2/6/2017'
      },
      {
        'avatar': 'ה',
        'name': 'הוראת קבע לרכב',
        'value': '-400',
        'date': '2/6/2017'
      },
    ];
    this.sum = [];
    this.mathString = '';
    this.updateRecords();
    this.getSummery();
  }
  openAddRecordDialog() {
    const dialogRef = this.dialog.open(NewRecordDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.records.push(result);
        this.updateRecords();
      }
    });
  }

  ngOnInit() {
  }

  evaluate(fn) {
  return new Function('return ' + fn)();
  }
  updateRecords() {
    for (const record in this.records) {
      if (this.records[record].hasOwnProperty('value')) {
        if (this.records[record].value) {
          this.mathString += this.records[record].value;
        }
      }
    }
    // console.log(this.mathString);
    console.log(this.mathString);
    this.sum = this.evaluate(this.mathString);
    this.mathString = '';
    if (Math.sign(this.sum) === 1) {
      this.sum = '+' + this.sum;
    }
  }
  getSummery() {
    const summeryRecords = [];
    for (const record in this.records) {
      if (this.records[record].hasOwnProperty('date')) {
        if (this.records[record].date) {
          const date = this.records[record].date;
          let summeryObject = {};
          summeryObject = {
            'date': date,
            'value': this.records[record].value
          };
          summeryRecords.push(summeryObject);

          // for (const summeryRecord in summeryRecords) {
          //   if (summeryRecords[summeryRecord].date === date) {
          //     summeryRecords[summeryRecord].value += ' ' + this.records[record].value;
          //   }
          // }
          //
        }
      }
    }
    console.log(summeryRecords);
  }
  // mergeObjects(objArr) {
  //   let storageObj = [];
  //   for (const obj in objArr) {
  //     storageObj.push(objArr[obj].date);
  //     // if (storageObj.date === objArr[obj].date) {
  //     // }
  //     storageObj = objArr[obj];
  //
  //   }
  // }
}

