import { Component, OnInit } from '@angular/core';
import { Fireball, Spell } from '../spells';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  spells: Spell[] = [Fireball, Fireball, Fireball];

  constructor() { }

  ngOnInit(): void {
  }

  addSpell(spell: Spell) {
    this.spells.push(spell);
  }
}
