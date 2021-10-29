import { Injectable } from '@angular/core';
import { Tile, ObjectSpawn, MapData } from './core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getMapJSON(tiles: Tile[], spawns: ObjectSpawn[]) {
    const m = { name: "new map", tiles: tiles, spawns: spawns };
    console.log(JSON.stringify(m));
  }

  loadMapJSON() {
    //todo: more than just test.json
    return this.http.get<MapData>("./assets/maps/test.json");
  }
}
