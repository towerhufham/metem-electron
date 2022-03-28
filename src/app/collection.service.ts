import { Injectable } from '@angular/core';
import { Pickup, SpellCollect } from './collectables';
import { CollectableKinds, otherSide, Side } from './core';
import { Spell } from './spells';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  collects = {
    "left": {
      pickups: {
        //keys
        "yellowKeys": 0,
        "blueKeys": 0,
        "redKeys": 0,
    
        //points
        "hp": 100,
        "xp": 0,
      },
      spells: [] as Spell[]
    }, 
    "right": {
      pickups: {
        //keys
        "yellowKeys": 0,
        "blueKeys": 0,
        "redKeys": 0,
    
        //points
        "hp": 100,
        "xp": 0,
      },
      spells: [] as Spell[]
    }
  };

  constructor() {}

  getPickups(side: Side, kind: CollectableKinds) {
    return this.collects[side].pickups[kind];
  }

  registerPickup(side: Side, collect: Pickup): void {
    //remember: collects on one board go to the other!
    const kind = collect.kind;
    const amount = collect.amount;
    this.collects[otherSide(side)].pickups[kind] += amount;
    //xp is shared between both boards
    if (kind === "xp") {
      this.collects[side].pickups[kind] += amount;
    }
  }

  registerSpellCollect(side: Side, collect: SpellCollect): void {
    //remember: collects on one board go to the other!
    this.collects[otherSide(side)].spells.push(collect.spell);
    this.collects[otherSide(side)].spells.sort((a, b) => a.id - b.id);
  }

  removeSpell(side: Side, spell: Spell) {
    const i = this.collects[side].spells.indexOf(spell);
    if (i !== -1) {
      this.collects[side].spells.splice(i, 1);
    }
  }

  takeDamage(side: Side, n: number) {
    this.collects[side].pickups.hp = Math.max(0, this.collects[side].pickups.hp - n);
  }
}
