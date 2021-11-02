import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {

  constructor(private infoService: InfoService) { }

  ngOnInit(): void {
  }

  getName(): string | undefined {
    return this.infoService.name;
  }

  getImg(): string | undefined {
    return this.infoService.img;
  }

  getDescription(): string | undefined {
    return this.infoService.description;
  }

}
