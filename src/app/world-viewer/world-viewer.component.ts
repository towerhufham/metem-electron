import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { WORLD_SIZE, Tile, ObjectOnMap, ObjectSpawn, ObjectType } from "../core";
import * as tileLibrary from "../tiles";
import { ALL_PICKUPS, ALL_SPELLCOLLECTS } from '../collectables';
import { Grid, BreadthFirstFinder } from "pathfinding";
import { CollectionService } from '../collection.service';
import { MapService } from '../map.service';
import { InfoService } from '../info.service';
import { ALL_GATES, ALL_ENEMIES } from '../obstacles';
import { Spell } from '../spells';
import { TargetingService } from '../targeting.service';


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

  @Input() debugMode: boolean = false;

  tiles: Tile[] = defaultMap();
  player: ObjectOnMap = new ObjectOnMap({ id:-1, name: "You!", img: "gnome.gif", group: "player"}, 7, 7);
  mapObjects: ObjectOnMap[] = [this.player];

  pathfindingGrid: Grid = this.makePathfindingGrid();
  finder = new BreadthFirstFinder();
  tilesInPath: Tile[] = [];

  targetedTiles: Tile[] = [];
  targetedObjects: ObjectOnMap[] = [];

  @ViewChild("mapInput") mapInput?: ElementRef<HTMLInputElement>;

  constructor(
    private collectionService: CollectionService, 
    private mapService: MapService, 
    private infoService: InfoService, 
    private targetingService: TargetingService
  ) { }

  ngOnInit(): void {
  }

  isTargeting(): Spell|null {
    return this.targetingService.getTargeting();
  }

  setTargeting(target: Spell|null) {
    this.targetingService.setTargeting(target);
  }

  mouseLeave() {
    this.clearPath();
    this.clearTargeted();
  }

  clearTargeted() {
    this.targetedTiles = [];
    this.targetedObjects = [];
  }

  castSpell(spell: Spell, x: number, y: number) {
    spell.effect(this, x, y);
    this.clearTargeted();
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
      //if there's an object there that isn't the player, delete it
      if (this.getObjectAt(x, y) !== this.player) {
        this.getObjectAt(x, y)?.remove();
      }
      this.mapObjects.push(new ObjectOnMap(type, x, y));
    }
  }

  spawnObjectOnMap(spawn: ObjectSpawn) {
    //get item from the ALL_ lists
    if (spawn.group === "pickup") {
      this.makeObjectOnMap(ALL_PICKUPS[spawn.id], spawn.x, spawn.y);
    } else if (spawn.group === "spellCollect") {
      this.makeObjectOnMap(ALL_SPELLCOLLECTS[spawn.id], spawn.x, spawn.y);
    } else if (spawn.group === "gate") {
      this.makeObjectOnMap(ALL_GATES[spawn.id], spawn.x, spawn.y);
    } else if (spawn.group === "enemy") {
      this.makeObjectOnMap(ALL_ENEMIES[spawn.id], spawn.x, spawn.y);
    } else {
      //unknown object
      alert("unknown object group for " + spawn);
    }
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
      if (o.type.group !== "pickup" && o.type.group !== "spellCollect" && o !== this.player && o !== ignore) {
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
    //usually move player, but sometimes build tile or cast spell
    if (!this.mapService.inBuildingMode()) {
      if (this.isTargeting() === null) {
        this.movePlayer(x, y);
      } else {
        this.castSpell(this.isTargeting()!, x, y);
        this.setTargeting(null);
      }
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
    //if we're not casting, show path
    if (this.isTargeting() === null) {
      this.getPlayerPathToTile(tile);
    } else {
      //show affected squares of spell
      this.setTargetingTiles(tile.x, tile.y);
    }
  }

  setTargetingTiles(px: number, py: number) {
    //also sets targeted objects
    this.clearTargeted();
    if (this.isTargeting() !== null) {
      //if targeted, use pointer x and y
      //if untargeted, use player's position as x and y
      let x = 0;
      let y = 0;
      if (this.isTargeting()?.targeted) {
        x = px;
        y = py;
      } else {
        x = this.player.x;
        y = this.player.y;
      }
      //add anchor tile, unless the flag is set not to
      if (this.isTargeting()?.includeAnchor) {
        this.targetedTiles.push(this.getTileAt(x, y));
        //add object on anchor tile if it exists
        const o = this.getObjectAt(x, y);
        if (o !== null && o !== this.player) {
          this.targetedObjects.push(o);
        }
      }
      //if there's an aoe, add all those tiles & objects as well
      if (this.isTargeting()!.aoe) {
        for (const t of this.isTargeting()!.aoe!) {
          const tx = x + t[0];
          const ty = y + t[1];
          if (tx >= 0 && tx < WORLD_SIZE && ty >= 0 && ty < WORLD_SIZE) {
            this.targetedTiles.push(this.getTileAt(tx, ty));
            const o = this.getObjectAt(tx, ty);
            if (o !== null && o !== this.player) {
              this.targetedObjects.push(o);
            }
          }
        }
      }
    }
  }

  movePlayer(x:number, y:number): void {
    if (this.tilesInPath.length > 1) {
      //check for collectibles
      for (const t of this.tilesInPath) {
        const o = this.getObjectAt(t.x, t.y);
        if (o && o != this.player) {
          if (o.type.group === "pickup") {
            //pickup
            this.mapObjects = this.mapObjects.filter(ob => ob !== o);
            // @ts-ignore
            this.collectionService.registerPickup(o.type);
          } else if (o.type.group === "spellCollect") {
            //spell
            this.mapObjects = this.mapObjects.filter(ob => ob !== o);
            // @ts-ignore
            this.collectionService.registerSpellCollect(o.type);
          }
        }
      }
      //check for interaction
      const o = this.getObjectAt(x, y);
      if (o) {
        if (o.type.interact && o.active) {
          //interact
          o.type.interact(o, this.collectionService);
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

  findDownStairs(): Tile|null  {
    //returns the the first found DownStairs
    for (const t of this.tiles) {
      if (t.name === "Stairs Down") {
        return t;
      } 
    }
    return null;
  }

  getMapJSON() {
    //have to convert actual objects on map to object spawns
    let spawns: ObjectSpawn[] = []
    for (const o of this.getActiveObjects()) {
      if (o !== this.player) {
        spawns.push({group: o.type.group, id: o.type.id, x: o.x, y: o.y});
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
          //put player on DownStairs
          const down = currentMap.findDownStairs();
          if (down) {
            currentMap.player.x = down.x;
            currentMap.player.y = down.y;
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
            //this function will check for objects already there :]
            this.makeObjectOnMap(o, x, y);
          }
        }
      }
    }
  }

  
}
