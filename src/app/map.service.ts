import { Injectable } from '@angular/core';
import { Tile, ObjectSpawn, MapData } from './core';
import { HttpClient } from '@angular/common/http';
import { TileType, makeTile } from './tiles';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  builderTileType?: TileType;

  constructor(private http: HttpClient) { }

  getMapJSON(tiles: Tile[], spawns: ObjectSpawn[]) {
    const m = { name: "new map", tiles: tiles, spawns: spawns };
    console.log(JSON.stringify(m));
  }

  loadMapJSON() {
    //todo: more than just test.json
    return this.http.get<MapData>("./assets/maps/test.json");
  }

  inBuildingMode(): boolean {
    if (this.builderTileType) {
      return true;
    } else {
      return false;
    }
  }

  setBuilderTile(t: TileType|undefined) {
    this.builderTileType = t;
  }

  makeBuilderTile(x: number, y: number): Tile|null {
    //returns a tile object from the tiletype selected in the builder
    if (this.builderTileType) {
      return makeTile(this.builderTileType, x, y);
    } else {
      return null;
    }
  }
}
