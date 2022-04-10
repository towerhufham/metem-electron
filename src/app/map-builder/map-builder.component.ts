import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { ALL_ITEMS, ALL_SPELLCOLLECTS, ALL_TILES } from '../factories';
import { ALL_ENEMIES, ALL_GATES } from '../factories';
import { ObjectType, TileType } from '../core';

@Component({
  selector: 'app-map-builder',
  templateUrl: './map-builder.component.html',
  styleUrls: ['./map-builder.component.scss']
})
export class MapBuilderComponent implements OnInit {

  tileLibrary = ALL_TILES;
  collectableLibrary = ALL_ITEMS;
  spellCollectLibrary = ALL_SPELLCOLLECTS;
  gateLibrary = ALL_GATES;
  enemyLibrary = ALL_ENEMIES

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  selectTile(t: TileType) {
    this.mapService.setBuilderTile(t);
  }

  getTile() {
    return this.mapService.builderTileType;
  }

  clearTile() {
    this.mapService.clearTileType()
  }

  selectObject(o: ObjectType) {
    this.mapService.setBuilderObject(o);
  }

  getObject() {
    return this.mapService.builderObjectType;
  }

  clearObject() {
    this.mapService.clearObjectType()
  }
}
