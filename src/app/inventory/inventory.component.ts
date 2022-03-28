import { Component, Input, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { Side } from '../core';
import { Spell } from '../spells';
import { TargetingService } from '../targeting.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  @Input() side: Side = "left";

  constructor(private cs: CollectionService, private targetingService: TargetingService) { }

  ngOnInit(): void {
  }

  getSpells(): Spell[] {
    return this.cs.collects[this.side].spells;
  }
  
  startCastingSpell(spell: Spell) {
    this.targetingService.startCastingSpell(spell);
    this.cs.removeSpell(this.side, spell);
  }

  getHp() {
    return this.cs.getPickups(this.side, "hp")
  }

  getXp() {
    return this.cs.getPickups(this.side, "xp")
  }

  getYellowKeys() {
    return this.cs.getPickups(this.side, "yellowKeys")
  }

  getBlueKeys() {
    return this.cs.getPickups(this.side, "blueKeys")
  }

  getRedKeys() {
    return this.cs.getPickups(this.side, "redKeys")
  }
}
