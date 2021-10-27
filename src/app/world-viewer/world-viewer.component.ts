import { Component, OnInit } from '@angular/core';
import { Tile } from "../game-entities";

const WORLD_SIZE = 15;

function defaultMap() {
  //just makes a 2d array of default TileComponents
  let map: Tile[][] = [];
  for (var i = 0; i < WORLD_SIZE; i++) {
    map[i] = [];
    for (var j = 0; j < WORLD_SIZE; j++) {
      //random for testing
      if (Math.random() < 0.5) {
        map[i][j] = { name: "default tile", img: "Ice_17_16x16" };
      } else {
        map[i][j] = { name: "default tile 2", img: "Fire_15_16x16" };
      }
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

  tiles: Tile[][] = defaultMap();

  constructor() { }

  ngOnInit(): void {
  }

}
