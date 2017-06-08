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
  summeryResult: Array<any> = [];
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
      {
        'avatar': 'ה',
        'name': 'הוראת קבע',
        'value': '+4200',
        'date': '3/6/2017'
      },
      {
        'avatar': 'ה',
        'name': 'הוראת קבע 2',
        'value': '-700',
        'date': '2/6/2017'
      },
    ];
    this.sum = [];
    this.mathString = '';
    this.updateRecords();
    let structuredSummery = this.getSummery();
    for(let summery in structuredSummery) {
      const date = Object.keys(structuredSummery[summery])["0"];
      let sumPositive = this.evaluate(structuredSummery[summery][date].positive);
      let sumNegative = this.evaluate(structuredSummery[summery][date].negative);
      let sumPositiveSigned;
      if(Math.sign(sumPositive) == 1) {
          sumPositiveSigned = '+' + sumPositive;
      }
      // sumNegative = toString(sumNegative)
      if(sumNegative) {
        sumNegative = sumNegative.toString()
      } else {
        sumNegative = '';
      }
      if(sumPositive) {
        sumPositive = sumPositive.toString()
      }
      let sum = sumPositiveSigned + sumNegative;
      sum = this.evaluate(sum);
      if(sum) {
          sum = sum.toString()
      }
      let result = {
        'date': Object.keys(structuredSummery[summery])["0"],
        'sumPositive': sumPositive ? sumPositive : 0,
        'sumNegative': sumNegative ? sumNegative : 0,
        'sum': sum
      };
      if(result) {
        this.summeryResult.push(result);
      }
    }

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
  };
  updateRecords() {
    for (const record in this.records) {
      if (this.records[record].hasOwnProperty('value')) {
        if (this.records[record].value) {
          this.mathString += this.records[record].value;
        }
      }
    }
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
        }
      }
    }
    return this.mergeSummeryObjects(summeryRecords);
  }

  mergeSummeryObjects(objArr) {
    let skipIndex = [];
    let saveData = {};
    let allData = [];
    let count = 0;
    for (const object in objArr) {
      let date = objArr[object].date;
      for (const object2 in objArr) {
        if (skipIndex.indexOf(object2) == -1) {
          //if the viewed date equals current iteration date
          if (date == objArr[object2].date) {
            let positive = '';
            let negative = '';
            if(Math.sign(objArr[object2].value) == 1) {
              positive = objArr[object2].value
            }
            else if(Math.sign(objArr[object2].value) == -1) {
              negative = objArr[object2].value
            }
            if(allData.length > 0) {
                //if allData[currentCount] contains the viewed date
                if (isNaN(this.findInObject(allData, date))) {
                  saveData = {
                    [date]: {
                      'positive': positive,
                      'negative': negative
                    }
                  };
                  allData.push(saveData);
                  skipIndex.push(object2);
                } else {
                  const currentCount = this.findInObject(allData, date);
                  if(Math.sign(objArr[object2].value) == 1) {
                    positive = objArr[object2].value;
                    allData[currentCount][date].positive += objArr[object2].value;
                  }
                  else if(Math.sign(objArr[object2].value) == -1) {
                    negative = objArr[object2].value;
                    allData[currentCount][date].negative += objArr[object2].value;
                  }
                  //insert to allData[current allData][date].values the value
                  skipIndex.push(object2);
                }
            } else {
              saveData = {
                [date]: {
                  'positive': positive,
                  'negative': negative
                }
              };
              allData.push(saveData);
              skipIndex.push(object2);
            }

          }
          count++;
        }
      }
    }
    return allData;
  }

  findInObject(object, date) {
    for(let i = 0; i < object.length; i++) {
      if (object[i][date]) {
        return i
      }
    }
  }
}

