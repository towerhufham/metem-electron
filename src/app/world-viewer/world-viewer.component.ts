import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WORLD_SIZE, Tile, ObjectType, ObjectOnMap } from "../core";
import * as collectables from "../collectables";
import { Grid, BreadthFirstFinder } from "pathfinding";

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
  player: ObjectOnMap = new ObjectOnMap({ name: "player", img: "player.png", collectable: false }, 7, 7);
  mapObjects: ObjectOnMap[] = [this.player];

  pathfindingGrid: Grid = this.makePathfindingGrid();
  finder = new BreadthFirstFinder();
  tilesInPath: Tile[] = [];

  @Output() collectionEvent = new EventEmitter<ObjectType>();

  constructor() { }

  ngOnInit(): void {
    //test
    this.makeObjectOnMap(collectables.YellowKey, 2, 2);
    this.makeObjectOnMap(collectables.BlueKey, 3, 2);
    this.makeObjectOnMap(collectables.RedKey, 4, 2);
  }

  makeObjectOnMap(type: ObjectType, x:number, y:number) {
    //todo: maybe prevent if on a wall?
    this.mapObjects.push(new ObjectOnMap(type, x, y));
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

  getObjectAt(x: number, y:number): ObjectOnMap|null {
    for (let o of this.mapObjects) {
      if (o.x === x && o.y === y) {
        return o;
      }
    }
    return null;
  }

  getPlayerTile(): Tile {
    const px = this.player.x;
    const py = this.player.y;
    return this.getTileAt(px, py);
  }

  clearPath(): void {
    this.tilesInPath = [];
  }

  getPlayerPathToTile(goal: Tile): void {
    const px = this.player.x;
    const py = this.player.y;
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

  movePlayer(x:number, y:number): void {
    if (this.tilesInPath.length > 1) {
      //check for collectibles
      for (const t of this.tilesInPath) {
        const o = this.getObjectAt(t.x, t.y);
        if (o) {
          if (o.type.collectable) {
            //collect
            this.mapObjects = this.mapObjects.filter(ob => ob !== o);
            this.collectionEvent.emit(o.type);
          }
        }
      }
      //actually move
      this.player.moveTo(x, y);
      this.clearPath();
    }
  }
}
