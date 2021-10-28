import { Component } from '@angular/core';
import { ObjectType } from "./core";
import * as collectables from './collectables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'metem';
  yellowKeys = 0;
  blueKeys = 0;
  redKeys = 0;

  registerCollection(collect: ObjectType): void {
    if (collect === collectables.YellowKey) {
      this.yellowKeys++;
    } else if (collect === collectables.BlueKey) {
      this.blueKeys++;
    } else if (collect === collectables.RedKey) {
      this.redKeys++;
    }
  }
}
