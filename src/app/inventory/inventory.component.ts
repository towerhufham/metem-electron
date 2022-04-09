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

  get(kind: string) {
    return this.cs.get(kind);
  }

  getSpells(): Spell[] {
    return this.cs.spells;
  }
  
  startCastingSpell(spell: Spell) {
    this.targetingService.startCastingSpell(spell);
    this.cs.removeSpell(spell);
  }

  getKeyList(): string[] {
    //just for visual candy
    return this.cs.getKeyList();
  }
}
