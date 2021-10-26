import { Component, OnInit } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

const WORLD_SIZE = 15;

function defaultMap() {
  //just makes a 2d array of default TileComponents
  let map: TileComponent[][] = [];
  for (var i = 0; i < WORLD_SIZE; i++) {
    map[i] = [];
    for (var j = 0; j < WORLD_SIZE; j++) {
      map[i][j] = new TileComponent();
    }
  }
  return map;
}

@Component({
  selector: 'app-world-viewer',
  templateUrl: './world-viewer.component.html',
  styleUrls: ['./world-viewer.component.scss']
})
export class WorldViewerComponent implements OnInit {

  tiles: TileComponent[][] = defaultMap();

  constructor() { }

  ngOnInit(): void {
  }

}
