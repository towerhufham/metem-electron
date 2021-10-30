import { Component, OnInit } from '@angular/core';
import { Tile } from "../core";
import { MapService } from '../map.service';
import { ALL_TILES, TileType } from '../tiles';

@Component({
  selector: 'app-map-builder',
  templateUrl: './map-builder.component.html',
  styleUrls: ['./map-builder.component.scss']
})
export class MapBuilderComponent implements OnInit {

  tileLibrary = ALL_TILES;
  selectedTile?: TileType;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  selectTile(t: TileType|undefined) {
    this.selectedTile = t;
    this.mapService.setBuilderTile(t);
  }
}
