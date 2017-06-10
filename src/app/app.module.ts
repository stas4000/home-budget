import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { NewRecordDialogComponent } from './components/new-record-dialog/new-record-dialog.component';
import { SummeryChartsCardsComponent } from './components/summery-charts-cards/summery-charts-cards.component';
import { BalanceLineChartComponent } from './components/charts/balance-line-chart/balance-line-chart.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CardComponent,
    NewRecordDialogComponent,
    SummeryChartsCardsComponent,
    BalanceLineChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    MaterialModule,
    MdNativeDateModule,
    ChartsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewRecordDialogComponent]
})
export class AppModule { }
