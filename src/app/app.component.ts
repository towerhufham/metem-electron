import { Component } from '@angular/core';
import { DEBUG } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'metem';
  DEBUG = DEBUG;
}
