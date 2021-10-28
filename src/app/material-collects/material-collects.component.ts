import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-material-collects',
  templateUrl: './material-collects.component.html',
  styleUrls: ['./material-collects.component.scss']
})
export class MaterialCollectsComponent implements OnInit {

  @Input() str = 0;
  @Input() dex = 0;
  @Input() int = 0;
  @Input() vit = 0;
  @Input() spi = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
