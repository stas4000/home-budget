import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceLineChartComponent } from './balance-line-chart.component';

describe('BalanceLineChartComponent', () => {
  let component: BalanceLineChartComponent;
  let fixture: ComponentFixture<BalanceLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
