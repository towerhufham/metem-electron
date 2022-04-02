import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { Spell } from '../spells';
import { TargetingService } from '../targeting.service';

@Component({
  selector: 'app-spell-inventory',
  templateUrl: './spell-inventory.component.html',
  styleUrls: ['./spell-inventory.component.scss']
})
export class SpellInventoryComponent implements OnInit {

  constructor(private collectionService: CollectionService, private targetingService: TargetingService) { }

  ngOnInit(): void {
  }

  getSpells(): Spell[] {
    return this.collectionService.spells;
  }
  
  startCastingSpell(spell: Spell) {
    this.targetingService.startCastingSpell(spell);
    this.collectionService.removeSpell(spell);
  }
}
