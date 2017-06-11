import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-balance-line-chart',
  templateUrl: './balance-line-chart.component.html',
  styleUrls: ['./balance-line-chart.component.css']
})
export class BalanceLineChartComponent implements OnInit {
  @Input() balance: any;

  public lineChartData:Array<any> = [
    {data: [], label: 'Balance report'},
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  constructor() { }

  ngOnInit() {
    this.lineChartData[0].data = this.balance.weekSum;
    this.lineChartLabels = this.balance.days;
  }

}
