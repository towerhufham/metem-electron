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

function emptyMapObjectsList() {
  let map: (MapObject|null)[] = [];
  for (var i = 0; i < WORLD_SIZE; i++) {
    for (var j = 0; j < WORLD_SIZE; j++) {
      map.push(null);
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
  mapObjects: (MapObject|null)[] = emptyMapObjectsList();
  player: MapObject = {name: "player", img: "player.png", x: 0, y: 0};

  pathfindingGrid: Grid = this.makePathfindingGrid();
  finder = new BreadthFirstFinder();
  tilesInPath: Tile[] = [];

  constructor() { }

  ngOnInit(): void {
    this.moveMapObjectTo(this.player, 7, 7)
    //test
    this.makeMapObjectAt("coin", "Coin_spin.gif", 2, 2)
  }

  makeMapObjectAt(name: string, img: string, x:number, y:number) {
    //todo: maybe prevent if on a wall?
    this.mapObjects[x + (y * WORLD_SIZE)] = {name: name, img: img, x: x, y: y};
  }

  moveMapObjectTo(o: MapObject, x: number, y: number) {
    //will overwrite anything already there
    o.x = x;
    o.y = y;
    this.mapObjects[x + (y * WORLD_SIZE)] = o;
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
    return this.tiles[x + (y * WORLD_SIZE)];
  }

  getObjectAt(x: number, y:number) {
    return this.mapObjects[x + (y * WORLD_SIZE)];
  }

  getAllObjects(): MapObject[] {
    let obj: MapObject[] = [];
    for (const o of this.mapObjects) {
      if (o) {
        obj.push(o);
      }
    }
    return obj;
  }

  getPlayerTile(): (Tile|null) {
    const px = this.player.x;
    const py = this.player.y;
    if (px && py) {
      return this.getTileAt(px, py);
    } else {
      return null;
    }
  }

  clearPath(): void {
    this.tilesInPath = [];
  }

  getPlayerPathToTile(goal: Tile): void {
    const px = this.player.x;
    const py = this.player.y;
    if (px && py) {
      this.clearPath();
      const gridBackup = this.pathfindingGrid.clone()
      const path = this.finder.findPath(px, py, goal.x, goal.y, this.pathfindingGrid);
      this.pathfindingGrid = gridBackup;
      for (let p of path) {
        const t = this.getTileAt(p[0], p[1]);
        this.tilesInPath.push(t);
        // t.img = "fire_wall.png";
      }
    }
  }

  movePlayer(x:number, y:number): void {
    if (this.tilesInPath.length > 1) {
      this.player.x = x;
      this.player.y = y;
      this.clearPath();
    }
  }
}
