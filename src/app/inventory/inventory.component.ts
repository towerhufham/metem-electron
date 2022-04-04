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

  get(kind: string) {
    return this.cs.get(kind);
  }

  getKeyList(): string[] {
    //just for visual candy
    let keys = [];
    for (let i = 0; i < this.cs.get("yellowKeys"); i++) {
      keys.push("yellow_key.png");
    }
    for (let i = 0; i < this.cs.get("blueKeys"); i++) {
      keys.push("blue_key.png");
    }
    for (let i = 0; i < this.cs.get("redKeys"); i++) {
      keys.push("red_key.png");
    }
    return keys;
  }
}
