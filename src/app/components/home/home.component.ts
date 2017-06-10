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
    this.updateSummery();

  }
  openAddRecordDialog() {
    const dialogRef = this.dialog.open(NewRecordDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.records.push(result);
        this.updateRecords();
        this.updateSummery();
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
  updateSummery() {
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
        'sum': sum,
        'actionCount': structuredSummery[summery][date].actionCount
      };
      if(result) {
        this.summeryResult.push(result);
      }
    }
    this.summeryResult.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      const firstDate:any = new Date(b.date);
      const secondDate:any = new Date(a.date);
      return firstDate - secondDate;
    });
    console.log(this.summeryResult);
  }
  getSummery() {
    this.summeryResult = [];
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
    let datesArray = [];
    for (const object in objArr) {
      let date = objArr[object].date;
      for (const object2 in objArr) {
        if (skipIndex.indexOf(object2) == -1) {
          //if the viewed date equals current iteration date
          if (date == objArr[object2].date) {
            datesArray.push(date);
            let positive = '';
            let negative = '';
            if(Math.sign(objArr[object2].value) == 1) {
              positive = objArr[object2].value;
              count++;
            }
            else if(Math.sign(objArr[object2].value) == -1) {
              negative = objArr[object2].value;
              count++;
            }
            if(allData.length > 0) {
                //if allData[currentCount] contains the viewed date
                if (isNaN(this.findInObject(allData, date))) {
                  saveData = {
                    [date]: {
                      'positive': positive,
                      'negative': negative,
                      'actionCount': ''
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
                  'negative': negative,
                  'actionCount': ''
                }
              };
              allData.push(saveData);
              skipIndex.push(object2);
            }
          }
          count = 0;
        }
      }
    }
    allData = this.placeActionCount(datesArray, allData);
    return allData;
  }
  placeActionCount(datesArray, summeryData) {
    let counts = {};
    datesArray.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    for(let date in counts) {
      for(let data in summeryData) {
        let summeryDate:any = Object.keys(summeryData[data]);
        if(summeryDate == date) {
          summeryData[data][date].actionCount = counts[date];
        }
      }
    }
    return summeryData;
  }
  findInObject(object, date) {
    for(let i = 0; i < object.length; i++) {
      if (object[i][date]) {
        return i
      }
    }
  }
}

