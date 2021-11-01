import { Injectable } from '@angular/core';
import { ObjectType } from './core';
import { isEqual } from "lodash";
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
  hp = 500;
  xp = 0;

  constructor() { }

  registerCollection(collect: ObjectType): void {
    //keys
    if (isEqual(collect, collectables.YellowKey)) {
      this.yellowKeys++;
    } else if (isEqual(collect, collectables.BlueKey)) {
      this.blueKeys++;
    } else if (isEqual(collect, collectables.RedKey)) {
      this.redKeys++;
    }
    //pickups
    else if (isEqual(collect, collectables.strPickup)) {
      this.str++;
    } else if (isEqual(collect, collectables.dexPickup)) {
      this.dex++;
    } else if (isEqual(collect, collectables.intPickup)) {
      this.int++;
    } else if (isEqual(collect, collectables.vitPickup)) {
      this.vit++;
    } else if (isEqual(collect, collectables.spiPickup)) {
      this.spi++;
    }
    //points
    else if (isEqual(collect, collectables.xpPickup)) {
      this.xp++;
    } else if (isEqual(collect, collectables.hpPickup)) {
      this.hp += 5;
    }
  }

  takeDamage(n: number) {
    this.hp = Math.max(0, this.hp - n);
  }
}
