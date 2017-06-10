import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-line-chart',
  templateUrl: './balance-line-chart.component.html',
  styleUrls: ['./balance-line-chart.component.css']
})
export class BalanceLineChartComponent implements OnInit {
  public lineChartData:Array<any> = [
    {data: [4000, 2700, -1000, 5000, 7000, 10500, 7000], label: 'Balance report'},
  ];
  public lineChartLabels:Array<any> = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  constructor() { }

  ngOnInit() {
  }

}
