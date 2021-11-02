import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WORLD_SIZE, Tile, ObjectType, ObjectOnMap, MapData, ObjectSpawn } from "../core";
import * as tileLibrary from "../tiles";
import * as collectables from "../collectables";
import * as obstacles from "../obstacles"
import { Grid, BreadthFirstFinder } from "pathfinding";
import { CollectionService } from '../collection.service';
import { MapService } from '../map.service';
import { interact } from "../interactions";
import { InfoService } from '../info.service';


function defaultMap() {
  let map: Tile[] = [];
  for (var i = 0; i < WORLD_SIZE; i++) {
    for (var j = 0; j < WORLD_SIZE; j++) {
      //testing
      if (Math.random() < 0.8) {
        // map.push({ name: "ice floor", img: "ice_floor.png", x: j, y: i, wall: false});
        map.push(tileLibrary.makeTile(tileLibrary.IceFloor, j, i));
      } else {
        //map.push({ name: "ice wall", img: "ice_wall.png", x: j, y: i, wall: true});
        map.push(tileLibrary.makeTile(tileLibrary.IceWall, j, i));
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
  player: ObjectOnMap = new ObjectOnMap({ name: "You!", img: "player.png", collectable: false }, 7, 7);
  mapObjects: ObjectOnMap[] = [this.player];

  pathfindingGrid: Grid = this.makePathfindingGrid();
  finder = new BreadthFirstFinder();
  tilesInPath: Tile[] = [];

  @ViewChild("mapInput") mapInput?: ElementRef<HTMLInputElement>;

  constructor(private collectionService: CollectionService, private mapService: MapService, private infoService: InfoService) { }

  ngOnInit(): void {
  }

  sendInfo(o: any | undefined) {
    let name: string | undefined = undefined;
    let img: string | undefined = undefined;
    let description: string | undefined = undefined;
    //for tiles
    if (o.hasOwnProperty("name")) {
      name = o.name;
    }
    if (o.hasOwnProperty("img")) {
      img = o.img;
    }
    if (o.hasOwnProperty("description")) {
      description = o.description;
    }
    //for objects
    if (o.hasOwnProperty("type")) {
      const t = o.type;
      name = t.name;
      img = t.img;
      if (t.hasOwnProperty("description")) {
        description = t.description;
      }
    }
    this.infoService.setInfo(name, img, description);
  }

  makeObjectOnMap(type: ObjectType, x:number, y:number) {
    //don't place if there's a wall
    if (!this.getTileAt(x, y).wall) {
      this.mapObjects.push(new ObjectOnMap(type, x, y));
    }
  }

  spawnObjectOnMap(spawn: ObjectSpawn) {
    this.makeObjectOnMap(spawn.type, spawn.x, spawn.y);
  }

  makePathfindingGrid(ignore?: ObjectOnMap): Grid {
    //"ignore" is used so that an object the player clicks on won't keep them from moving
    let grid = new Grid(WORLD_SIZE, WORLD_SIZE);
    for (const t of this.tiles) {
      if (t.wall) {
        grid.setWalkableAt(t.x, t.y, false);
      }
    }
    for (const o of this.getActiveObjects()) {
      if (!o.type.collectable && o !== this.player && o !== ignore) {
        grid.setWalkableAt(o.x, o.y, false)
      }
    }
    return grid;
  }

  getTileAt(x: number, y: number) {
    return this.tiles[x + (y * WORLD_SIZE)];
  }

  getObjectAt(x: number, y:number): ObjectOnMap|null {
    for (let o of this.mapObjects) {
      if (o.x === x && o.y === y && o.active) {
        return o;
      }
    }
    return null;
  }

  getActiveObjects(): ObjectOnMap[] {
    return this.mapObjects.filter((o) => o.active);
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
    if (!this.mapService.inBuildingMode()) {
      const o = this.getObjectAt(goal.x, goal.y);
      if (o) {
        this.pathfindingGrid = this.makePathfindingGrid(o);
      } else {
        this.pathfindingGrid = this.makePathfindingGrid();
      }
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
  }

  clickHandler(x: number, y: number) {
    //usually move player, but sometimes build tile
    if (!this.mapService.inBuildingMode()) {
      this.movePlayer(x, y);
    } else {
      this.tryBuildThing(x, y);
    }
  }

  hoverHandler(tile: Tile) {
    //send info
    const o = this.getObjectAt(tile.x, tile.y);
    if (o) {
      this.sendInfo(o);
    } else {
      this.sendInfo(tile);
    }
    this.getPlayerPathToTile(tile);
  }

  movePlayer(x:number, y:number): void {
    if (this.tilesInPath.length > 1) {
      //check for collectibles
      for (const t of this.tilesInPath) {
        const o = this.getObjectAt(t.x, t.y);
        if (o) {
          if (o.type.collectable && o.active) {
            //collect
            this.mapObjects = this.mapObjects.filter(ob => ob !== o);
            this.collectionService.registerCollection(o.type);
          }
        }
      }
      //check for interaction
      const o = this.getObjectAt(x, y);
      if (o) {
        if (o.type.interaction && o.active) {
          //interact
          interact(o, this.collectionService);
          if (o.active) {
            //if the object is still there after interacting, place player just before it
            const semiFinalStep = this.tilesInPath[this.tilesInPath.length - 2];
            x = semiFinalStep.x;
            y = semiFinalStep.y;
          }
        }
      }
      //actually move
      this.player.moveTo(x, y);
      this.clearPath();
    }
  }

  getMapJSON() {
    //have to convert actual objects on map to object spawns
    let spawns: ObjectSpawn[] = []
    for (const o of this.getActiveObjects()) {
      if (o !== this.player) {
        spawns.push({type: o.type, x: o.x, y: o.y});
      }
    };
    this.mapService.getMapJSON(this.tiles, spawns);
  }

  loadMapJSON() {
    const name = this.mapInput?.nativeElement.value!;
    if (name != "") {
      const player = this.player;
      const ob = this.mapService.loadMapJSON(name);
      let currentMap = this;
      ob.subscribe({
        next(x) { 
          currentMap.tiles = x.tiles;
          currentMap.mapObjects = [player];
          for (const s of x.spawns) {
            currentMap.spawnObjectOnMap(s);
          }
        }
      });
    }
  }

  tryBuildThing(x: number, y: number) {
    //could be building a tile or an object
    if (this.mapService.inBuildingMode()) {
      //TILE
      if (this.mapService.builderTileType) {
        const t = this.mapService.makeBuilderTile(x, y);
        if (t) {
          //if we're building a wall over an object, destroy it unless it's the player
          if (t.wall) {
            const o = this.getObjectAt(x, y);
            if (o) {
              if (o !== this.player) {
                o.remove();
              }
            }
          }
          //place tile
          this.tiles[x + (y * WORLD_SIZE)] = t;
        }
      //OBJECT
      } else if (this.mapService.builderObjectType) {
        const o = this.mapService.makeBuilderObject();
        if (o) {
          //don't place if wall
          if (!this.getTileAt(x, y).wall) {
            //if there's already an object, remove it
            this.getObjectAt(x, y)?.remove()
            this.makeObjectOnMap(o, x, y);
          }
        }
      }
    }
  }

  
}
