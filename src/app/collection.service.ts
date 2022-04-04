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
    "purpleKeys": 0,
    "forestKeys": 0,
    "fireKeys": 0,
    "waterKeys": 0,

    //points
    "hp": 100,
    "xp": 0,
    "atk": 0,
    "def": 0
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
    this.spells.sort((a, b) => a.id - b.id);
  }

  removeSpell(spell: Spell) {
    const i = this.spells.indexOf(spell);
    if (i !== -1) {
      this.spells.splice(i, 1);
    }
  }

  takeDamage(n: number) {
    if (n > 0) {
      this.collects.hp = Math.max(0, this.collects.hp - n);
    }
  }
}
