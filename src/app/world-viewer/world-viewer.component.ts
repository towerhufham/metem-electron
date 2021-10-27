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

  private playerBFS(x:number, y:number, currentPath: Tile[], visited: Tile[]): Tile[] {
    //init
    const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const lastTile = currentPath[currentPath.length - 1];
    let newTiles = [];
    //check four directions
    for (const d of dirs) {
      const dx = lastTile.x + d[0];
      const dy = lastTile.y + d[1];
      //check if new tiles are valid
      if (dx >= 0 && dx < WORLD_SIZE && dy >= 0 && dy < WORLD_SIZE) {
        const t = this.getTileAt(dx, dy);
        //check for visited
        if (!visited.includes(t)) {
          visited.push(t);
          newTiles.push(t);
        }
      }
    }
    //check valid, adjacent, unvisited tiles
    for (const t of newTiles) {
      //check if goal
      if (t.x === x && t.y === y) {
        return currentPath.concat(t);
      } else {
        //not goal, but could be closer
        let newPath = currentPath.concat(t);
        return this.playerBFS(x, y, newPath, visited);
      }
    }
    //if we got here, found nothing
    return [];
  }

  getPlayerPathToTile(x: number, y: number): Tile[] {
    const px = this.player.x;
    const py = this.player.y;
    const playerTile = this.getTileAt(px, py);
    const path = this.playerBFS(x, y, [playerTile], []);
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
