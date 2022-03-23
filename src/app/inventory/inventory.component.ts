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

  constructor(private targetingService: TargetingService, private collectionService: CollectionService) { }

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
