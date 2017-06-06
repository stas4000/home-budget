import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummeryChartsCardsComponent } from './summery-charts-cards.component';

describe('SummeryChartsCardsComponent', () => {
  let component: SummeryChartsCardsComponent;
  let fixture: ComponentFixture<SummeryChartsCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummeryChartsCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummeryChartsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
