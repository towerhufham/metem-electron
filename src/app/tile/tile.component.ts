import { Component, OnInit, Input } from '@angular/core';
import { MapObject, Tile } from '../game-entities';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() tile?: Tile;
  @Input() object?: MapObject;

  constructor() { }

  ngOnInit(): void {
  }

}
