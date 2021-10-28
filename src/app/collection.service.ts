import { Injectable } from '@angular/core';
import { ObjectType } from './core';
import * as collectables from "./collectables";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  //keys
  yellowKeys = 0;
  blueKeys = 0;
  redKeys = 0;

  //pickups
  str = 0;
  dex = 0;
  int = 0;
  vit = 0;
  spi = 0;

  //points
  hp = 0;
  mp = 0;
  xp = 0;

  constructor() { }

  registerCollection(collect: ObjectType): void {
    //keys
    if (collect === collectables.YellowKey) {
      this.yellowKeys++;
    } else if (collect === collectables.BlueKey) {
      this.blueKeys++;
    } else if (collect === collectables.RedKey) {
      this.redKeys++;
    }
    //pickups
    else if (collect === collectables.strPickup) {
      this.str++;
    } else if (collect === collectables.dexPickup) {
      this.dex++;
    } else if (collect === collectables.intPickup) {
      this.int++;
    } else if (collect === collectables.vitPickup) {
      this.vit++;
    } else if (collect === collectables.spiPickup) {
      this.spi++;
    }
    //xp
    else if (collect === collectables.xpPickup) {
      this.xp++;
    }
  }
}
