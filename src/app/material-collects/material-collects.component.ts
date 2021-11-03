import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { PersistenceService } from '../persistence.service';

@Component({
  selector: 'app-material-collects',
  templateUrl: './material-collects.component.html',
  styleUrls: ['./material-collects.component.scss']
})
export class MaterialCollectsComponent implements OnInit {

  constructor(private collectionService: CollectionService, private persistenceService: PersistenceService) { }

  ngOnInit(): void {
  }

  getHp() {
    return this.collectionService.collects.hp;
  }

  getStr() {
    return this.collectionService.collects.str;
  }

  getDex() {
    return this.collectionService.collects.dex;
  }

  getInt() {
    return this.collectionService.collects.int;
  }

  getVit() {
    return this.collectionService.collects.vit;
  }

  getSpi() {
    return this.collectionService.collects.spi;
  }
}
