import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-summery-charts-cards',
  templateUrl: './summery-charts-cards.component.html',
  styleUrls: ['./summery-charts-cards.component.css']
})
export class SummeryChartsCardsComponent implements OnInit {
  @Input() date: any;
  @Input() sumPositive: any;
  @Input() sumNegative: any;
  @Input() sum: any;
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'doughnut';
  public pieOptions = {
    legend: {
      display: false,
      labels: {
        fontSize: 25
      }
    },
    tooltips: {
      bodyFontSize: 15
    }
  };

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  constructor() {
  }

  ngOnInit() {
  }

}
