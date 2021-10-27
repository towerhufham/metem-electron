import { Component, OnInit } from '@angular/core';
import { Tile, MapObject } from "../game-entities";
import { Grid, BreadthFirstFinder } from "pathfinding";

const WORLD_SIZE = 15;

function defaultMap() {
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
  pathfindingGrid: Grid = this.makePathfindingGrid();
  finder = new BreadthFirstFinder();
  player: MapObject = {name: "coin", img: "player.png", x: 7, y: 7};
  objects: MapObject[] = [this.player];

  constructor() { }

  ngOnInit(): void {
  }

  makePathfindingGrid(): Grid {
    let grid = new Grid(WORLD_SIZE, WORLD_SIZE);
    for (const t of this.tiles) {
      if (t.wall) {
        grid.setWalkableAt(t.x, t.y, false);
      }
    }
    return grid;
  }

  getTileAt(x: number, y: number) {
    return this.tiles[x + (y*WORLD_SIZE)];
  }

  getPlayerTile() {
    const px = this.player.x;
    const py = this.player.y;
    return this.getTileAt(px, py);
  }

  getPlayerPathToTile(goal: Tile): void {
    const gridBackup = this.pathfindingGrid.clone()
    const px = this.player.x;
    const py = this.player.y;
    const path = this.finder.findPath(px, py, goal.x, goal.y, this.pathfindingGrid);
    this.pathfindingGrid = gridBackup;
    console.log(path);
    for (let p of path) {
      const t = this.getTileAt(p[0], p[1]);
      t.img = "fire_wall.png";
    }
  }

  moveCoin(x:number, y:number): void {
    if (!this.getTileAt(x, y).wall) {
      this.player.x = x;
      this.player.y = y;
    }
  }
}
