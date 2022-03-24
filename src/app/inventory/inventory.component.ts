import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { Spell } from '../spells';
import { TargetingService } from '../targeting.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
  }

  getHp() {
    return this.collectionService.collects.hp;
  }

  getXp() {
    return this.collectionService.collects.xp;
  }

  getYellowKeys() {
    return this.collectionService.collects.yellowKeys;
  }

  getBlueKeys() {
    return this.collectionService.collects.blueKeys;
  }

  getRedKeys() {
    return this.collectionService.collects.redKeys;
  }
}
