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

    //multipliers
    "hp_mult": 1,
    "str_mult": 1,
    "dex_mult": 1,
    "int_mult": 1,
    "vit_mult": 1,
    "spi_mult": 1,

    //points
    "hp": 100,
    "xp": 0,
  }

  constructor() { }

  registerCollection(collect: Collectable): void {
    const kind = collect.kind;
    const amount = collect.amount;
    if (kind === "str" || kind === "dex" || kind === "int" || kind === "vit" || kind === "spi" || kind === "hp") {
      //stats & hp get multiplied
      // @ts-ignore
      this.collects[kind] += (amount * this.collects[kind + "_mult"])
    } else {
      //normal pickups (like keys)
      this.collects[kind] += amount;
    }
  }

  takeDamage(n: number) {
    this.collects.hp = Math.max(0, this.collects.hp - n);
  }
}
