import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-astral-collects',
  templateUrl: './astral-collects.component.html',
  styleUrls: ['./astral-collects.component.scss']
})
export class AstralCollectsComponent implements OnInit {

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
  }

  getXp() {
    return this.collectionService.xp;
  }

  getYellowKeys() {
    return this.collectionService.yellowKeys;
  }

  getBlueKeys() {
    return this.collectionService.blueKeys;
  }

  getRedKeys() {
    return this.collectionService.redKeys;
  }
}
