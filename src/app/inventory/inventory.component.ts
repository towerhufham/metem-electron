import { Component, OnInit } from '@angular/core';
import { Fireball, Spell } from '../spells';
import { TargetingService } from '../targeting.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  spells: Spell[] = [Fireball, Fireball, Fireball];

  constructor(private targetingService: TargetingService) { }

  ngOnInit(): void {
  }

  addSpell(spell: Spell) {
    this.spells.push(spell);
  }

  startCastingSpell(spell: Spell) {
    this.targetingService.startCastingSpell(spell);
  }
}
