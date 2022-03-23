import { Injectable } from '@angular/core';
import { Pickup, SpellCollect } from './collectables';
import { Spell } from './spells';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  collects = {
    //keys
    "yellowKeys": 0,
    "blueKeys": 0,
    "redKeys": 0,

    //points
    "hp": 100,
    "xp": 0,
  }

  spells: Spell[] = [];

  constructor() { }

  registerPickup(collect: Pickup): void {
    const kind = collect.kind;
    const amount = collect.amount;
    this.collects[kind] += amount;
  }

  registerSpellCollect(collect: SpellCollect): void {
    this.spells.push(collect.spell);
  }

  takeDamage(n: number) {
    this.collects.hp = Math.max(0, this.collects.hp - n);
  }
}
