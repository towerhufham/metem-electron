import { Injectable } from '@angular/core';
import { Fireball, Spell } from './spells';

@Injectable({
  providedIn: 'root'
})
export class TargetingService {

  isTargeting: Spell|null = null;

  getTargeting() {
    return this.isTargeting;
  }

  setTargeting(target: Spell|null) {
    this.isTargeting = target;
  }

  startCastingSpell(spell: Spell) {
    //todo: non-targeted spells still need to have one of the two boards chosen
    this.setTargeting(spell);
  }

  constructor() { }
}
