import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'metem';
  keys = 0;

  getKeys(n: number) {
    this.keys += n;
  }
}
