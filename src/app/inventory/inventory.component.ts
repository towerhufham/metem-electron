import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { Spell } from '../spells';
import { TargetingService } from '../targeting.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(private cs: CollectionService, private targetingService: TargetingService) { }

  ngOnInit(): void {
  }

  getSpells(): Spell[] {
    return this.cs.spells;
  }
  
  startCastingSpell(spell: Spell) {
    this.targetingService.startCastingSpell(spell);
    this.cs.removeSpell(spell);
  }

  getHp() {
    return this.cs.collects.hp;
  }

  getAtk() {
    return this.cs.collects.atk;
  }

  getDef() {
    return this.cs.collects.def;
  }

  getXp() {
    return this.cs.collects.xp;
  }

  getKeyList(): string[] {
    //just for visual candy
    let keys = [];
    for (let i = 0; i < this.cs.collects.yellowKeys; i++) {
      keys.push("yellow_key.png");
    }
    for (let i = 0; i < this.cs.collects.blueKeys; i++) {
      keys.push("blue_key.png");
    }
    for (let i = 0; i < this.cs.collects.redKeys; i++) {
      keys.push("red_key.png");
    }
    return keys;
  }

  getYellowKeys() {
    return this.cs.collects.yellowKeys;
  }

  getBlueKeys() {
    return this.cs.collects.blueKeys;
  }

  getRedKeys() {
    return this.cs.collects.redKeys;
  }
}
