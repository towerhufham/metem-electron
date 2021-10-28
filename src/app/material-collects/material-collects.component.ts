import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-material-collects',
  templateUrl: './material-collects.component.html',
  styleUrls: ['./material-collects.component.scss']
})
export class MaterialCollectsComponent implements OnInit {

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
  }

  getStr() {
    return this.collectionService.str;
  }

  getDex() {
    return this.collectionService.dex;
  }

  getInt() {
    return this.collectionService.int;
  }

  getVit() {
    return this.collectionService.vit;
  }

  getSpi() {
    return this.collectionService.spi;
  }
}
