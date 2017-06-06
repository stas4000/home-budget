import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() avatar: string;
  @Input() name: string;
  @Input() value: number;
  constructor() { }

  ngOnInit() {
  }

}
