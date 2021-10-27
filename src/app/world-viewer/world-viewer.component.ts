import { Component, OnInit } from '@angular/core';
import { Tile, MapObject } from "../game-entities";

const WORLD_SIZE = 15;

function defaultMap() {
  //just makes a 2d array of default TileComponents
  let map: Tile[] = [];
  for (var i = 0; i < WORLD_SIZE; i++) {
    for (var j = 0; j < WORLD_SIZE; j++) {
      //testing
      if (Math.random() < 0.8) {
        map.push({ name: "ice floor", img: "ice_floor.png", x: j, y: i, wall: false});
      } else {
        map.push({ name: "ice wall", img: "ice_wall.png", x: j, y: i, wall: true});
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

  tiles: Tile[] = defaultMap();
  player: MapObject = {name: "coin", img: "player.png", x: 7, y: 7};
  objects: MapObject[] = [this.player];

  constructor() { }

  ngOnInit(): void {
  }

  getTileAt(x: number, y: number) {
    return this.tiles[x + (y*WORLD_SIZE)];
  }

  getPlayerTile() {
    const px = this.player.x;
    const py = this.player.y;
    return this.getTileAt(px, py);
  }

  private playerBFS(goal: Tile): Tile[] {
    const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    let q = [];
    let discovered = [this.getPlayerTile()];
    q.push(this.getPlayerTile());
    while (q.length > 0) {
      const v = q.pop();
      if (v) {
        for (const d of dirs) {
          const dx = v.x + d[0];
          const dy = v.y + d[1];
          const t = this.getTileAt(dx, dy);
          if (t) {
            if (t === goal) {
              q.push(t);
              return q;
            } else if (!discovered.includes(t)) {
              discovered.push(t);
              q.push(t);
            }
          }
        }
      }
    }
    return [];
  }

  getPlayerPathToTile(goal: Tile): Tile[] {
    const path = this.playerBFS(goal);
    for (let t of path) {
      t.img = "fire_wall.png";
    }
    return path;
  }

  moveCoin(x:number, y:number): void {
    if (!this.getTileAt(x, y).wall) {
      this.player.x = x;
      this.player.y = y;
    }
  }
}
