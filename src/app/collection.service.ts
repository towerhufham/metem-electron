import { Injectable } from '@angular/core';
import { Collectable } from './collectables';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  collects = {
    //keys
    "yellowKeys": 0,
    "blueKeys": 0,
    "redKeys": 0,

    //pickups
    "str": 0,
    "dex": 0,
    "int": 0,
    "vit": 0,
    "spi": 0,

    //points
    "hp": 500,
    "xp": 0,
  }

  constructor() { }

  registerCollection(collect: Collectable): void {
    const kind = collect.kind;
    const amount = collect.amount;
    this.collects[kind] += amount;
  }

  takeDamage(n: number) {
    this.collects.hp = Math.max(0, this.collects.hp - n);
  }
}
