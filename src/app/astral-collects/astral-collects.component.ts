import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-astral-collects',
  templateUrl: './astral-collects.component.html',
  styleUrls: ['./astral-collects.component.scss']
})
export class AstralCollectsComponent implements OnInit {

  @Input() yellowKeys: number = 0;
  @Input() blueKeys: number = 0;
  @Input() redKeys: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
