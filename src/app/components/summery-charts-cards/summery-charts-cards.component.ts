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
  @Input() actionCount: any;
  public pieChartLabels: string[] = ['הכנסות', 'הוצאות'];
  public pieChartData: number[] = [];
  public pieColors:Array<any> = [{backgroundColor: ["#69cc69", "#fd8f8f"]}];

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
    this.pieChartData = [Math.abs(parseInt(this.sumPositive)), Math.abs(parseInt(this.sumNegative))];
  }

}
