import { Injectable } from '@angular/core';
import { CollectionService } from './collection.service';
import { ObjectOnMap, Tile } from './core';
import { Enemy } from './core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  name?: string = "Hover over";
  img?: string;
  description?: string = "something to see its description";
  
  constructor(private cs: CollectionService) { }

  getTileInfo(t: Tile) {
    this.setInfo(t.name, t.img, "tile");
  }

  getObjectInfo(o: ObjectOnMap) {
    const type = o.type;
    if (type.group === "enemy") {
      //todo: look into "guard functions"?
      // @ts-ignore
      this.setInfo(type.name, type.img, this.makeEnemyDescription(type));
    } else {
      //TODO: REFACTOR THIS
      this.setInfo(type.name, type.img, "[other object]");
    }
  }

  setInfo(name?: string, img?: string, description?: string) {
    this.name = name;
    this.img = img;
    this.description = description;
  }

  makeEnemyDescription(enemy: Enemy): string {
    const atk = this.cs.get("atk");
    const def = this.cs.get("def");
    const immunityPhrase = enemy.immunity ? ` It is immune to ${enemy.immunity}.` : "";
    if (atk < enemy.level) {
      return `You need ${enemy.level - atk} more ATK to defeat this enemy.` + immunityPhrase;
    }
      if (def < enemy.level) {
        return `You can defeat this enemy, but you will take ${enemy.level - def} damage.` + immunityPhrase;
      } else {
        return `You can defeat this enemy unharmed.` + immunityPhrase;
      }
  }
}
