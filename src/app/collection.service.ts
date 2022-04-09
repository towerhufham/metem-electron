import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Injectable } from '@angular/core';
import { Pickup, SpellCollect } from './collectables';
import { Spell } from './spells';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  collects = new Map<string, number>();

  spells: Spell[] = [];

  constructor() { 
    //the 0 ones aren't that necessary, but it makes me feel better
    this.collects.set("hp", 100);
    this.collects.set("atk", 0);
    this.collects.set("def", 0);
    this.collects.set("xp", 0);
  }

  get(kind: string): number {
    if (this.collects.has(kind)) {
      return this.collects.get(kind)!;
    } else {
      return 0;
    }
  }

  getKeyList(): string[] {
    let list: string[] = [];
    for (const [key, value] of this.collects) {
      if (key.endsWith("_key")) {
        for (let i=0; i < value; i++) {
          list.push(key);
        }
      }
    }
    return list;
  }

  registerPickup(collect: Pickup): void {
    const kind = collect.kind;
    const total = this.get(kind) + collect.amount;
    this.collects.set(kind, total);
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
      this.collects.set("hp", Math.max(0, this.collects.get("hp")! - n));
    }
  }
}
